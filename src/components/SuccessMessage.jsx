export default function SuccessMessage({ submittedData, onReset, onViewList }) {
  return (
    <div className="form-card success-card" role="status" aria-live="polite">
      <div className="card-accent-bar success-accent-bar" />

      <div className="success-icon-wrapper">
        <svg className="success-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 className="success-title">Registration Submitted! 🎉</h2>
      
      <p className="success-description">
        Thank you for registering for the <strong>GIMT Teachers’ Day Celebration 2026</strong>. Your performance details have been successfully saved into the database.
      </p>

      {submittedData && (
        <div className="submission-summary">
          <div className="summary-header-row">
            <h3 className="summary-heading">Registration Summary</h3>
            <span className="summary-status-badge">Saved in Database</span>
          </div>

          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Participant Name</span>
              <span className="summary-value">{submittedData.name}</span>
            </div>
            
            <div className="summary-item">
              <span className="summary-label">Performance Type</span>
              <span className="summary-value badge-category">{submittedData.performance}</span>
            </div>

            <div className="summary-item">
              <span className="summary-label">Contact</span>
              <span className="summary-value">{submittedData.contact}</span>
            </div>

            <div className="summary-item">
              <span className="summary-label">Academic Year</span>
              <span className="summary-value">{submittedData.year}</span>
            </div>

            {submittedData.performanceDetails && (
              <div className="summary-item full-span">
                <span className="summary-label">Performance Details</span>
                <span className="summary-value">{submittedData.performanceDetails}</span>
              </div>
            )}

            {submittedData.teamMembers && (
              <div className="summary-item full-span">
                <span className="summary-label">Team Members</span>
                <span className="summary-value">{submittedData.teamMembers}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="success-actions">
        <button
          type="button"
          onClick={onReset}
          className="btn btn-outline"
        >
          <svg className="reset-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
          <span>Register Another Performance</span>
        </button>

        {onViewList && (
          <button
            type="button"
            onClick={onViewList}
            className="btn btn-primary"
          >
            <svg className="reset-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            <span>View & Export All Registrations</span>
          </button>
        )}
      </div>
    </div>
  );
}
