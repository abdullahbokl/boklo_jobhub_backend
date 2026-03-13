const APPLICATION_STATUS = Object.freeze({
  applied: "applied",
  underReview: "under_review",
  interview: "interview",
  accepted: "accepted",
  rejected: "rejected",
});

const LEGACY_STATUS_MAP = Object.freeze({
  pending: APPLICATION_STATUS.applied,
  reviewed: APPLICATION_STATUS.underReview,
  applied: APPLICATION_STATUS.applied,
  under_review: APPLICATION_STATUS.underReview,
  interview: APPLICATION_STATUS.interview,
  accepted: APPLICATION_STATUS.accepted,
  rejected: APPLICATION_STATUS.rejected,
});

export const applicationStatuses = Object.freeze(Object.values(APPLICATION_STATUS));

export function normalizeApplicationStatus(status) {
  if (!status) return APPLICATION_STATUS.applied;
  return LEGACY_STATUS_MAP[status] || APPLICATION_STATUS.applied;
}

