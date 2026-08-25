import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
import { useJobItems } from "../../hook";
import type { JobItemExpanded } from "../../types";

type BookmarksContextValue = {
	bookmarks: number[];
	handleBookmarkIds: (id: number) => void;
	bookmarkedJobItems: JobItemExpanded[];
	isLoading: boolean;
};

export const BookmarksContext = createContext<BookmarksContextValue | null>(
	null,
);

export default function BookmarksProvider({
	children,
}: {
	children: ReactNode;
}) {
	const storedBookmarks = localStorage.getItem("bookmarks");
	const initialBookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];
	const [bookmarks, setBookmarks] = useState<number[]>(initialBookmarks);
	const { jobItems: bookmarkedJobItems, isLoading } = useJobItems(bookmarks);
	const handleBookmarkIds = (id: number) => {
		setBookmarks((previousBookmarks) =>
			previousBookmarks.includes(id)
				? previousBookmarks.filter((bookmark) => bookmark !== id)
				: [...previousBookmarks, id],
		);
	};

	useEffect(() => {
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	}, [bookmarks]);
	return (
		<BookmarksContext.Provider
			value={{
				bookmarks,
				handleBookmarkIds,
				bookmarkedJobItems,
				isLoading,
			}}
		>
			{children}
		</BookmarksContext.Provider>
	);
}
