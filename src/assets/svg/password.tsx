export default function PasswordSvg() {
  return (
    <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-square-asterisk"
      >
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
        <path d="M12 8v8"></path>
        <path d="m8.5 14 7-4"></path>
        <path d="m8.5 10 7 4"></path>
      </svg>
    </span>
  );
}
