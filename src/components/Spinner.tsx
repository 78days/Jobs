export default function Spinner({ variant = "search" }: { variant?: "search" | "job-details" }) {
	return <div className={`spinner spinner--${variant}`} aria-label="Loading" />;
}
