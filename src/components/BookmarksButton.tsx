import { TriangleDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import BookmarksPopover from "./BookmarksPopover";

export default function BookmarksButton() {
	const { oepn, setopen } = useState(false);
	return (
		<section>
			<button
				className="bookmarks-btn"
				type="button"
				onClick={() => {
					setopen(!open);
				}}
			>
				Bookmarks <TriangleDownIcon />
			</button>

			{open && <BookmarksPopover />}
		</section>
	);
}
