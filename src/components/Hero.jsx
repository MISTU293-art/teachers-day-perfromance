export default function Hero() {
  const scrollToRegister = (e) => {
    e.preventDefault();
    const element = document.getElementById('register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="event-date-badge">
          <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>3rd September 2026</span>
        </div>

        <h1 className="hero-title">
          Teachers’ Day Celebration 2026
        </h1>
        
        <p className="hero-subtitle">
          Student Performance Registration
        </p>

        <p className="hero-description">
          Celebrate our teachers with your talent. Register your performance for the Teachers’ Day celebration organized by the students of GIMT.
        </p>

        <div className="hero-cta-group">
          <a 
            href="#register" 
            onClick={scrollToRegister} 
            className="btn btn-primary btn-lg"
          >
            <span>Register Your Performance</span>
            <svg className="arrow-down-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
