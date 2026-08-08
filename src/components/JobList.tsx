import JobListItem from "./JobListItem";

export function JobList({ jobitems }) {
	return (
		<ul className="job-list">
			{jobitems.map((jobitem) => (
				<JobListItem key={jobitem.id} jobitem={jobitem} />
			))}
		</ul>
	);
}

export default JobList;
