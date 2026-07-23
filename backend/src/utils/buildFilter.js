const buildFilter = (query) => {
  const { search, severity, status, role, region, resourceType, action } = query;

  const filter = {};

  if (search) {
    filter.$or = [
      { actor: { $regex: search, $options: "i" } },
      { action: { $regex: search, $options: "i" } },
      { resource: { $regex: search, $options: "i" } },
      { ipAddress: { $regex: search, $options: "i" } },
    ];
  }

  if (severity) filter.severity = severity.toUpperCase();
  if (status) filter.status = status;
  if (role) filter.role = role.toLowerCase();
  if (region) filter.region = region.toLowerCase();
  if (resourceType) filter.resourceType = resourceType.toUpperCase();
  if (action) filter.action = action.toUpperCase();

  return filter;
};

module.exports = buildFilter;
