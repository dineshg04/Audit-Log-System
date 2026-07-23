import React from "react";

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      severity: "",
      status: "",
      role: "",
      region: "",
      sort: "newest",
    });
  };

  return (
    <div className="flex flex-wrap items-end gap-4 mb-6">
     
      <div>
        <label className="block text-sm font-medium mb-1">Severity</label>
        <select
          name="severity"
          value={filters.severity}
          onChange={handleChange}
          className="border rounded-md p-2 w-40"
        >
          <option value="">All Severity</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
          <option value="CRITICAL">CRITICAL</option>
        </select>
      </div>

     
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="border rounded-md p-2 w-40"
        >
          <option value="">All Status</option>
          <option value="Resolved">Resolved</option>
          <option value="Unresolved">Unresolved</option>
        </select>
      </div>

     
      <div>
        <label className="block text-sm font-medium mb-1">Role</label>
        <select
          name="role"
          value={filters.role}
          onChange={handleChange}
          className="border rounded-md p-2 w-40"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="support">Support</option>
          <option value="user">User</option>
        </select>
      </div>

   
      <div>
        <label className="block text-sm font-medium mb-1">Region</label>
        <select
          name="region"
          value={filters.region}
          onChange={handleChange}
          className="border rounded-md p-2 w-40"
        >
          <option value="">All Regions</option>
          <option value="ap-south-1">ap-south-1</option>
          <option value="us-east-1">us-east-1</option>
          <option value="eu-west-1">eu-west-1</option>
          <option value="sa-east-1">sa-east-1</option>
        </select>
      </div>

    
      <div>
        <label className="block text-sm font-medium mb-1">Sort By</label>
        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="border rounded-md p-2 w-52"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="severityHigh">Severity (High → Low)</option>
          <option value="severityLow">Severity (Low → High)</option>
        </select>
      </div>

      
      <button
        onClick={handleClearFilters}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterBar;
