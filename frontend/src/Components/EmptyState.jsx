import React from "react";

const EmptyState = () => {
  return (
    <div className="bg-white rounded-lg shadow p-10 text-center">
      <h2 className="text-xl font-semibold mb-2">No Logs Found</h2>
      <p className="text-gray-500">Upload a file or adjust your search and filters.</p>
    </div>
  );
};

export default EmptyState;
