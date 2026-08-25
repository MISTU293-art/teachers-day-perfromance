import { PERFORMANCE_TYPES, ACADEMIC_YEARS } from '../utils/validation';

export default function PerformanceForm({
  formData,
  errors,
  touched,
  isSubmitting,
  submitError,
  handleChange,
  handleBlur,
  handleSubmit
}) {
  const handleCategorySelect = (categoryId) => {
    handleChange({
      target: { name: 'performance', value: categoryId }
    });
  };

  const handleYearSelect = (year) => {
    handleChange({
      target: { name: 'year', value: year }
    });
  };

  return (
    <div className="form-card">
      <div className="card-top-accent" />

      {/* Header Banner */}
      <div className="card-header">
        <div className="badge-row">
          <span className="badge-event">
            <span className="badge-icon">🎉</span>
            <span>Teachers’ Day 2026</span>
          </span>
          <span className="badge-date">
            <span className="badge-icon">📅</span>
            <span>3rd September 2026</span>
          </span>
        </div>
        <h1 className="form-heading">Student Performance Registration</h1>
        <p className="form-description">
          Register your act to celebrate our teachers. Simple & quick to submit.
        </p>
      </div>

      {/* Error Alert */}
      {submitError && (
        <div className="alert-box alert-danger" role="alert">
          <svg className="alert-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span className="alert-text">{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="form-body">
        
        {/* Section 1: Student Information */}
        <div className="form-section">
          <div className="section-header">
            <span className="section-badge">1</span>
            <h2 className="section-title">Student Information</h2>
          </div>

          <div className="grid-2col">
            {/* Full Name */}
            <div className="field-group">
              <label htmlFor="name" className="field-label">
                <span>Full Name</span>
                <span className="field-req">*</span>
              </label>
              <div className="input-box">
                <span className="input-leading-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Rahul Sharma"
                  className={`text-input ${touched.name && errors.name ? 'is-invalid' : ''}`}
                  disabled={isSubmitting}
                  autoComplete="name"
                />
              </div>
              {touched.name && errors.name && (
                <div className="field-error">{errors.name}</div>
              )}
            </div>

            {/* Contact */}
            <div className="field-group">
              <label htmlFor="contact" className="field-label">
                <span>Contact Number</span>
                <span className="field-req">*</span>
              </label>
              <div className="input-box">
                <span className="input-leading-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 9876543210"
                  className={`text-input ${touched.contact && errors.contact ? 'is-invalid' : ''}`}
                  disabled={isSubmitting}
                  autoComplete="tel"
                />
              </div>
              {touched.contact && errors.contact && (
                <div className="field-error">{errors.contact}</div>
              )}
            </div>
          </div>

          {/* Academic Year Selection */}
          <div className="field-group mt-sm">
            <label className="field-label">
              <span>Academic Year</span>
              <span className="field-req">*</span>
            </label>
            <div className="year-selector-grid">
              {ACADEMIC_YEARS.map((year) => {
                const isActive = formData.year === year;
                return (
                  <button
                    type="button"
                    key={year}
                    onClick={() => handleYearSelect(year)}
                    className={`year-pill-btn ${isActive ? 'is-active' : ''}`}
                    disabled={isSubmitting}
                  >
                    <span className="pill-check-indicator">{isActive ? '✓' : ''}</span>
                    <span>{year}</span>
                  </button>
                );
              })}
            </div>
            {touched.year && errors.year && (
              <div className="field-error">{errors.year}</div>
            )}
          </div>
        </div>

        {/* Section 2: Performance Act */}
        <div className="form-section">
          <div className="section-header">
            <span className="section-badge">2</span>
            <h2 className="section-title">Select Performance Act</h2>
            <span className="field-req">*</span>
          </div>

          <div className="act-cards-grid">
            {PERFORMANCE_TYPES.map((cat) => {
              const isSelected = formData.performance === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`act-card ${isSelected ? 'is-selected' : ''}`}
                  disabled={isSubmitting}
                >
                  <span className="act-emoji">{cat.icon}</span>
                  <span className="act-label">{cat.label}</span>
                  {isSelected && <span className="act-check">✓</span>}
                </button>
              );
            })}
          </div>
          {touched.performance && errors.performance && (
            <div className="field-error text-center mt-xs">{errors.performance}</div>
          )}
        </div>

        {/* Section 3: Performance Details */}
        <div className="form-section">
          <div className="section-header">
            <span className="section-badge">3</span>
            <h2 className="section-title">Act Details</h2>
            <span className="badge-optional">Optional</span>
          </div>

          <div className="field-group">
            <label htmlFor="performanceDetails" className="field-label">
              <span>Song / Play Title or Specific Requirements</span>
            </label>
            <div className="input-box">
              <span className="input-leading-icon textarea-align" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </span>
              <textarea
                id="performanceDetails"
                name="performanceDetails"
                rows={2}
                maxLength={500}
                value={formData.performanceDetails}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Solo Dance / Song title / 5-min comedy skit"
                className="text-input textarea-input"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="field-group mt-sm">
            <label htmlFor="teamMembers" className="field-label">
              <span>Team Members (if performing in a group)</span>
            </label>
            <div className="input-box">
              <span className="input-leading-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <input
                type="text"
                id="teamMembers"
                name="teamMembers"
                maxLength={500}
                value={formData.teamMembers}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Rahul, Sneha, Amit (leave blank for solo)"
                className="text-input"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="submit-wrapper">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-main-submit"
          >
            {isSubmitting ? (
              <>
                <span className="submit-spinner" aria-hidden="true" />
                <span>Submitting Registration...</span>
              </>
            ) : (
              <>
                <span>Submit Performance Registration</span>
                <span className="submit-arrow" aria-hidden="true">→</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
