import JobList from "./JobList";
import Sidebar from "./Sidebar";

type typecontainer = {
	jobitems: [];
	setjobitems: React.Dispatch<React.SetStateAction<jobitem[]>>;
};
export default function Container({ jobitems, setjobitems }: typecontainer) {
	return (
		<div className="container">
			<Sidebar jobitems={jobitems} setjobitems={setjobitems} />
			<JobList jobitems={jobitems} />
		</div>
	);
}
