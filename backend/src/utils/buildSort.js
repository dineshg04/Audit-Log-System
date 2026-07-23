const buildSort = (query) => {
  const { sortBy = "timestamp", order = "desc" } = query;

  const allowedFields = [
    "timestamp",
    "severity",
    "severityLevel",
    "status",
    "actor",
    "role",
    "action",
    "region",
    "resourceType",
  ];

  const sort = {};

  if (allowedFields.includes(sortBy)) {
    sort[sortBy] = order === "asc" ? 1 : -1;
  } else {
    sort.timestamp = -1;
  }

  return sort;
};

module.exports = buildSort;
