function escapeRegex(value = "") {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseSalaryNumber(value) {
  if (value == null) return null;
  const normalized = String(value).replace(/[^0-9.]/g, "");
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseSalaryBounds(value) {
  if (value == null) return null;

  const matches = String(value)
    .match(/\d+(?:\.\d+)?/g)
    ?.map(Number)
    .filter((item) => Number.isFinite(item));

  if (matches == null || matches.length === 0) {
    return null;
  }

  if (matches.length == 1) {
    return { min: matches[0], max: matches[0] };
  }

  matches.sort((a, b) => a - b);
  return { min: matches[0], max: matches[matches.length - 1] };
}

function pushAndClause(filter, clause) {
  if (!filter.$and) filter.$and = [];
  filter.$and.push(clause);
}

export function buildJobFilters(query = {}, { includeArchived = false } = {}) {
  const filter = {};

  if (!includeArchived && query.includeArchived !== "true") {
    // Backward compatibility: legacy jobs won't have the field set yet.
    filter.isArchived = { $ne: true };
  }

  const search = String(query.query || query.search || "").trim();
  if (search) {
    const regex = new RegExp(escapeRegex(search), "i");
    filter.$or = [
      { title: regex },
      { company: regex },
      { location: regex },
      { description: regex },
    ];
  }

  const location = String(query.location || "").trim();
  if (location) {
    filter.location = { $regex: escapeRegex(location), $options: "i" };
  }

  const contract = String(query.contract || query.jobType || "").trim();
  if (contract) {
    pushAndClause(filter, {
      $or: [
        { contract },
        { period: contract },
      ],
    });
  }

  return filter;
}

export function getSalaryRange(query = {}) {
  const minSalary = parseSalaryNumber(query.minSalary);
  const maxSalary = parseSalaryNumber(query.maxSalary);

  if (minSalary == null && maxSalary == null) {
    return null;
  }

  return { minSalary, maxSalary };
}

export function getJobSalaryValue(job = {}) {
  const parsedBounds = parseSalaryBounds(job.salary);
  if (parsedBounds) {
    return parsedBounds.min;
  }

  const salaryValue = Number(job.salaryValue);
  if (Number.isFinite(salaryValue) && salaryValue > 0) {
    return salaryValue;
  }

  return 0;
}

export function getJobSalaryBounds(job = {}) {
  const parsedBounds = parseSalaryBounds(job.salary);
  if (parsedBounds) {
    return parsedBounds;
  }

  const salaryValue = getJobSalaryValue(job);
  return { min: salaryValue, max: salaryValue };
}

export function matchesSalaryRange(job, range) {
  if (!range) return true;

  const salary = getJobSalaryBounds(job);
  if (range.minSalary != null && salary.min < range.minSalary) {
    return false;
  }

  if (range.maxSalary != null && salary.max > range.maxSalary) {
    return false;
  }

  return true;
}

export function toJobResponse(job) {
  const { _id, __v, agentId, ...rest } = job;
  return {
    id: _id,
    agentId: agentId?.toString(),
    ...rest,
  };
}
