import type { JobItem } from "../../types.ts";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
import { Useactiveid } from "../../hook.ts";
export default function JobList({
	jobitems,
	isloading,
}: {
	jobitems: JobItem[];
	isloading: boolean;
}) {

	const activeid = Useactiveid()
	return (
		<ul className="job-list">
			{isloading && <Spinner />}

			{!isloading &&
				jobitems.map((jobitem) => (
					<JobListItem key={jobitem.id} jobitem={jobitem} isactive={jobitem.id === activeid}/>
				))}
		</ul>
	);
}
