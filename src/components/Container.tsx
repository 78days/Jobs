import JobList from "./JobList";
import Sidebar from "./Sidebar";

export default function Container() {
	return (
		<div className="container">
			<Sidebar />
			<JobList />
		</div>
	);
}
