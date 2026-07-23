import React, { useEffect, useState } from "react";
import { getLogs } from "../api/logApi";
import useDebounce from "../hooks/useDebounce";

import UploadFile from "../Components/UploadFile";
import SearchBar from "../Components/SearchBar";
import FilterBar from "../Components/FilterBar";
import LogTable from "../Components/LogTable";
import Pagination from "../Components/Pagination";
import Loader from "../Components/Loader";
import EmptyState from "../Components/EmptyState";

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    limit: 10,
  });

 
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [filters, setFilters] = useState({
    severity: "",
    status: "",
    role: "",
    region: "",
    sort: "newest",
  });

  
  const handleSetSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleSetFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const fetchLogs = async () => {
    try {
      setLoading(true);

      let sortBy = "timestamp";
      let order = "desc";

      switch (filters.sort) {
        case "oldest":
          sortBy = "timestamp";
          order = "asc";
          break;
        case "severityHigh":
          sortBy = "severityLevel";
          order = "desc";
          break;
        case "severityLow":
          sortBy = "severityLevel";
          order = "asc";
          break;
        default:
          sortBy = "timestamp";
          order = "desc";
      }

      const response = await getLogs({
        page,
        limit: 10,
        search: debouncedSearch,
        severity: filters.severity,
        status: filters.status,
        role: filters.role,
        region: filters.region,
        sortBy,
        order,
      });

      setLogs(response.data.logs);
      setPagination(response.data.pagination);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    
  }, [page, debouncedSearch, filters]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Audit Log Dashboard</h1>

        <UploadFile fetchLogs={fetchLogs} />

        <SearchBar search={search} setSearch={handleSetSearch} />

        <FilterBar filters={filters} setFilters={handleSetFilters} />

        {loading ? (
          <Loader />
        ) : logs.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <LogTable logs={logs} />
            <Pagination pagination={pagination} setPage={setPage} />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
