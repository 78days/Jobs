import { useContext } from "react";
import { BookmarksContext } from "../context/BookmarksContext";
import JobList from "./JobList";
export default function BookmarksPopover() {
	const { bookmarkedJobItems , isLoading } = useContext(BookmarksContext);
	console.log(bookmarkedJobItems);
	console.log(isLoading);
	return (
		<div className="bookmarks-popover">
			<JobList jobitems={bookmarkedJobItems} isloading={isLoading} />
		</div>
	);
}
