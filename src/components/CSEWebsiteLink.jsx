
export default function CSEWebsiteLink() {
  const cseWebsite =
    "https://teachers-day-gimt-2026-v1.vercel.app/";

  const handleOpenWebsite = () => {
    window.open(cseWebsite, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      className="cse-website-btn"
      onClick={handleOpenWebsite}
      aria-label="Visit GIMT Computer Science and Engineering website"
    >
      <svg
        className="cse-website-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>

      <span>CSE Website</span>
    </button>
  );
}

