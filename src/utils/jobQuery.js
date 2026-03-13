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
    filter.contract = contract;
  }

  const minSalary = parseSalaryNumber(query.minSalary);
  const maxSalary = parseSalaryNumber(query.maxSalary);
  if (minSalary != null || maxSalary != null) {
    filter.salaryValue = {};
    if (minSalary != null) filter.salaryValue.$gte = minSalary;
    if (maxSalary != null) filter.salaryValue.$lte = maxSalary;
  }

  return filter;
}

export function toJobResponse(job) {
  const { _id, __v, agentId, ...rest } = job;
  return {
    id: _id,
    agentId: agentId?.toString(),
    ...rest,
  };
}
