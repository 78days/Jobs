import type { JobItem } from "../../types.ts";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
export default function JobList({
	jobitems,
	isloading,
}: {
	jobitems: JobItem[];
	isloading: boolean;
}) {
	return (
		<ul className="job-list">
			{isloading && <Spinner />}

			{!isloading &&
				jobitems.map((jobitem) => (
					<JobListItem key={jobitem.id} jobitem={jobitem} />
				))}
		</ul>
	);
}
