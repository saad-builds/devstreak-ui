import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import Navbar from "../components/layout/Navbar";
import { formatDate } from "../utils/dates";

const RATINGS = ["", "😞", "😐", "🙂", "😊", "🔥"];
const ITEMS_PER_PAGE = 10;

export default function History() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  // Filter & Sort States
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // 'desc' = Newest First, 'asc' = Oldest First

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    api
      .get("/logs?limit=100")
      .then((res) => setLogs(res.data.logs || []))
      .catch(() => toast.error("Failed to load history"))
      .finally(() => setLoading(false));
  }, []);

  // Filter & Sort Logic
  const filteredLogs = useMemo(() => {
    let result = logs.filter((log) => {
      // Search filter
      const matchesSearch =
        !search ||
        log.workedOn?.toLowerCase().includes(search.trim().toLowerCase()) ||
        log.learned?.toLowerCase().includes(search.trim().toLowerCase()) ||
        log.promptResponse?.toLowerCase().includes(search.trim().toLowerCase());

      // Rating filter
      const matchesRating =
        !selectedRating || String(log.sessionRating) === selectedRating;

      // Date range filter
      const logDate = log.dateUTC ? new Date(log.dateUTC) : null;
      let matchesDate = true;

      if (logDate) {
        if (startDate) {
          const start = new Date(startDate);
          start.setHours(0, 0, 0, 0);
          matchesDate = matchesDate && logDate >= start;
        }
        if (endDate) {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          matchesDate = matchesDate && logDate <= end;
        }
      }

      return matchesSearch && matchesRating && matchesDate;
    });

    // Sort Logic
    return result.sort((a, b) => {
      const dateA = new Date(a.dateUTC || a.createdAt);
      const dateB = new Date(b.dateUTC || b.createdAt);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
  }, [logs, search, selectedRating, startDate, endDate, sortOrder]);

  // Reset to page 1 whenever filters or sorting change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedRating, startDate, endDate, sortOrder]);

  // Pagination Calculation
  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE) || 1;
  const startEntry =
    filteredLogs.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endEntry = Math.min(currentPage * ITEMS_PER_PAGE, filteredLogs.length);
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredLogs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredLogs, currentPage]);

  const clearFilters = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    setSelectedRating("");
    setSortOrder("desc");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-4xl animate-pulse">🔥</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Your Log History</h1>
            <p className="text-gray-400 text-sm">
              Showing {startEntry}-{endEntry} of {filteredLogs.length} total
              entries
            </p>
          </div>
          {(search ||
            startDate ||
            endDate ||
            selectedRating ||
            sortOrder !== "desc") && (
            <button
              onClick={clearFilters}
              className="text-xs text-orange-400 hover:underline self-start sm:self-auto"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Keyword Search */}
            <input
              type="text"
              placeholder="Search your logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />

            {/* Sort Order Dropdown */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-orange-500"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>

            {/* Rating Dropdown */}
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-orange-500"
            >
              <option value="">All Ratings</option>
              {RATINGS.map(
                (emoji, idx) =>
                  idx > 0 && (
                    <option key={idx} value={idx}>
                      {emoji} Rating {idx}
                    </option>
                  ),
              )}
            </select>
          </div>

          {/* Date Range Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-gray-800/60">
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                From Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                To Date
              </label>
              <input
                type="date"
                value={endDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredLogs.length === 0 && (
          <div className="text-center py-16 text-gray-600 bg-gray-900/40 rounded-xl border border-gray-800/80">
            <p className="text-4xl mb-3">📓</p>
            <p className="text-gray-400 font-medium">
              No logs match your filter criteria.
            </p>
          </div>
        )}

        {/* Logs List */}
        <div className="space-y-3">
          {paginatedLogs.map((log) => (
            <div
              key={log._id}
              className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() =>
                  setExpanded(expanded === log._id ? null : log._id)
                }
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <div>
                    <span className="text-white font-medium block">
                      {formatDate(log.dateUTC)}
                    </span>
                    {/* Preview summary snippet when collapsed */}
                    {expanded !== log._id && log.workedOn && (
                      <span className="text-xs text-gray-500 line-clamp-1 max-w-sm sm:max-w-md">
                        {log.workedOn}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {log.sessionRating && (
                    <span className="text-lg">
                      {RATINGS[log.sessionRating]}
                    </span>
                  )}
                  <span className="text-gray-500 text-sm">
                    {expanded === log._id ? "▲" : "▼"}
                  </span>
                </div>
              </button>

              {expanded === log._id && (
                <div className="px-5 pb-5 space-y-4 border-t border-gray-800 pt-4">
                  {log.workedOn && (
                    <div>
                      <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-1">
                        Worked On
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {log.workedOn}
                      </p>
                    </div>
                  )}
                  {log.learned && (
                    <div>
                      <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-1">
                        Learned
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {log.learned}
                      </p>
                    </div>
                  )}
                  {log.promptResponse && (
                    <div>
                      <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-1">
                        Prompt Response
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {log.promptResponse}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {filteredLogs.length > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-between pt-6 border-t border-gray-800 mt-6">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              &lt;
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {(() => {
                const pages = [];
                const maxVisible = 5; // Total buttons visible at once

                if (totalPages <= maxVisible) {
                  for (let i = 1; i <= totalPages; i++) pages.push(i);
                } else {
                  // Always show page 1
                  pages.push(1);

                  if (currentPage > 3) {
                    pages.push("...");
                  }

                  // Pages around active page
                  const start = Math.max(2, currentPage - 1);
                  const end = Math.min(totalPages - 1, currentPage + 1);

                  for (let i = start; i <= end; i++) {
                    if (!pages.includes(i)) pages.push(i);
                  }

                  if (currentPage < totalPages - 2) {
                    pages.push("...");
                  }

                  // Always show last page
                  if (!pages.includes(totalPages)) {
                    pages.push(totalPages);
                  }
                }

                return pages.map((page, index) => {
                  if (page === "...") {
                    return (
                      <span
                        key={`dots-${index}`}
                        className="px-2 text-gray-500 text-sm"
                      >
                        ...
                      </span>
                    );
                  }

                  const isActive = currentPage === page;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-orange-500 text-white font-bold"
                          : "bg-gray-900 border border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  );
                });
              })()}
            </div>

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
