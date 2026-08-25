import { useContext } from "react";
import { BookmarksContext } from "../context/BookmarksContext";
import JobList from "./JobList";
export default function BookmarksPopover() {
	const bookmarks = useContext(BookmarksContext);

	if (!bookmarks) {
		throw new Error("BookmarksPopover must be rendered inside BookmarksProvider");
	}

	const { bookmarkedJobItems, isLoading } = bookmarks;
	return (
		<div className="bookmarks-popover">
			<JobList jobitems={bookmarkedJobItems} isloading={isLoading} />
		</div>
	);
}
