import React from "react";

const LogTable = ({ logs }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left border-b">Actor</th>
            <th className="p-3 text-left border-b">Role</th>
            <th className="p-3 text-left border-b">Action</th>
            <th className="p-3 text-left border-b">Severity</th>
            <th className="p-3 text-left border-b">Status</th>
            <th className="p-3 text-left border-b">Resource Type</th>
            <th className="p-3 text-left border-b">Region</th>
             <th className="p-3 text-left border-b">IP Address</th>
            <th className="p-3 text-left border-b">Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{log.actor}</td>
              <td className="p-3 border-b capitalize">{log.role}</td>
              <td className="p-3 border-b">{log.action}</td>
            

              <td className="p-3 border-b">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    log.severity === "CRITICAL"
                      ? "bg-red-100 text-red-700"
                      : log.severity === "HIGH"
                      ? "bg-orange-100 text-orange-700"
                      : log.severity === "MEDIUM"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {log.severity}
                </span>
              </td>

              <td className="p-3 border-b">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    log.status === "Resolved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {log.status}
                </span>
              </td>
                <td className="p-3 border-b">{log.resourceType}</td>
              <td className="p-3 border-b">{log.region}</td>
               <td className="p-3 border-b">{log.ipAddress}</td>

              <td className="p-3 border-b">{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogTable;
