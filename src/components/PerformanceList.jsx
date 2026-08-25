import { useState, useEffect } from 'react';
import { getPerformancesList } from '../services/performanceService';
import { exportToCSV, exportToExcel, printParticipantList } from '../utils/exportUtils';
import { PERFORMANCE_TYPES, ACADEMIC_YEARS } from '../utils/validation';

export default function PerformanceList({ onBackToForm }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    let isMounted = true;
    getPerformancesList()
      .then((data) => {
        if (isMounted) {
          setList(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load performance list:', err);
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter list
  const filteredList = list.filter((item) => {
    const nameMatch = (item.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const contactMatch = (item.contact || '').toLowerCase().includes(searchTerm.toLowerCase());
    const searchPass = !searchTerm || nameMatch || contactMatch;

    const catPass = !selectedCategory || (item.performance || item.category) === selectedCategory;
    const yearPass = !selectedYear || (item.year || item.academicYear) === selectedYear;

    return searchPass && catPass && yearPass;
  });

  return (
    <div className="performance-list-view">
      {/* Top Controls Header (Hidden in Print) */}
      <div className="list-top-bar no-print">
        <button type="button" onClick={onBackToForm} className="btn btn-outline btn-sm">
          <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Back to Registration</span>
        </button>

        <div className="export-btn-group">
          <button 
            type="button" 
            onClick={() => exportToCSV(filteredList)} 
            className="btn btn-export btn-csv"
            title="Download CSV file"
          >
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Export CSV</span>
          </button>

          <button 
            type="button" 
            onClick={() => exportToExcel(filteredList)} 
            className="btn btn-export btn-excel"
            title="Download Excel spreadsheet"
          >
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
            <span>Export Excel</span>
          </button>

          <button 
            type="button" 
            onClick={printParticipantList} 
            className="btn btn-export btn-print"
            title="Print or Save as PDF"
          >
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="table-card">
        {/* Printable Official Header */}
        <div className="print-header">
          <h2 className="print-college-title">Global Institute of Management and Technology</h2>
          <p className="print-dept-title">Department of Computer Science & Engineering</p>
          <h3 className="print-event-title">Teachers’ Day Celebration 2026 — Student Performance List</h3>
          <p className="print-meta">
            <span>Date: 3rd September 2026</span> • <span>Total Records: {filteredList.length}</span> • <span>Generated: {new Date().toLocaleDateString()}</span>
          </p>
        </div>

        {/* Filters Section (Hidden in Print) */}
        <div className="table-filters no-print">
          <div className="search-box">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by student name or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="clear-search-btn">✕</button>
            )}
          </div>

          <div className="filter-selects">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {PERFORMANCE_TYPES.map((t) => (
                <option key={t.id} value={t.id}>{t.icon} {t.label}</option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="filter-select"
            >
              <option value="">All Years</option>
              {ACADEMIC_YEARS.map((y) => (
                <option key={y.id} value={y.id}>{y.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table Content */}
        {loading ? (
          <div className="table-loading-state">
            <span className="spinner" />
            <p>Loading registrations...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="table-empty-state">
            <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <h3>No registrations found</h3>
            <p>
              {searchTerm || selectedCategory || selectedYear
                ? 'Try adjusting your search or filters.'
                : 'No student has registered yet. Submit a performance to see it here!'}
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="participants-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>#</th>
                  <th>Participant</th>
                  <th>Contact</th>
                  <th>Year</th>
                  <th>Performance</th>
                  <th>Details</th>
                  <th>Team</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((item, index) => (
                  <tr key={item._id || item.id || index}>
                    <td className="col-index">{index + 1}</td>
                    <td className="col-name">
                      <strong>{item.name}</strong>
                    </td>
                    <td className="col-contact">{item.contact}</td>
                    <td className="col-year">
                      <span className="year-pill">{item.year || item.academicYear || '-'}</span>
                    </td>
                    <td className="col-perf">
                      <span className="perf-pill">{item.performance || item.category}</span>
                    </td>
                    <td className="col-details">{item.performanceDetails || item.details || '-'}</td>
                    <td className="col-team">{item.teamMembers || '-'}</td>
                    <td className="col-date">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer Summary */}
        <div className="table-footer-info">
          <span>Showing <strong>{filteredList.length}</strong> of <strong>{list.length}</strong> total registrations</span>
        </div>
      </div>
    </div>
  );
}
