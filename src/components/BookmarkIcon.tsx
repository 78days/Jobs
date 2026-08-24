import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../context/BookmarksContext.tsx";

export default function BookmarkIcon({ id }: { id?: number }) {
	const context = useContext(BookmarksContext);

	if (!context) {
		throw new Error("BookmarkIcon must be rendered inside BookmarksProvider");
	}

	const { bookmarks, handleBookmarkIds } = context;
	const isBookmarked = id !== undefined && bookmarks.includes(id);

	return (
		<button
			className="bookmark-btn"
			type="button"
			onClick={(event) => {
				event.preventDefault();
				event.stopPropagation();
				if (id !== undefined) handleBookmarkIds(id);
			}}
			aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
			aria-pressed={isBookmarked}
		>
			<BookmarkFilledIcon className={isBookmarked ? "filled" : undefined} />
		</button>
	);
}
