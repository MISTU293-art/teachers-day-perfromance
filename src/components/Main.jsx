import React from "react";

export default function EventNavigation({ onMainEvent }) {
  return (
    <section className="event-navigation">
      <div className="event-navigation-inner">
        {/* Event Identity */}
        <div className="event-info">
          <div className="event-logo">CSE</div>

          <div className="event-text">
            <h2>Teachers' Day Celebration 2026</h2>
            <p>Department of Computer Science & Engineering</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="event-nav">
          <button
            type="button"
            className="event-nav-link active"
            onClick={onMainEvent}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 11.5L12 4l9 7.5" />
              <path d="M5 10.5V20h14v-9.5" />
              <path d="M9 20v-6h6v6" />
            </svg>

            <span>Main CSE Event</span>
          </button>
        </nav>
      </div>
    </section>
  );
}
