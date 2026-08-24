import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type BookmarksContextValue = {
	bookmarks: number[];
	handleBookmarkIds: (id: number) => void;
};

export const BookmarksContext = createContext<BookmarksContextValue | null>(null);

export default function BookmarksProvider({ children }: { children: ReactNode }) {
  const storedBookmarks = localStorage.getItem("bookmarks")
  const initialBookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : []
	const [bookmarks, setBookmarks] = useState<number[]>( initialBookmarks);

	const handleBookmarkIds = (id: number) => {
		setBookmarks((previousBookmarks) =>
			previousBookmarks.includes(id)
				? previousBookmarks.filter((bookmark) => bookmark !== id)
				: [...previousBookmarks, id],
		);
	};

  useEffect(() => {
    localStorage.setItem("bookmarks" , JSON.stringify(bookmarks))
  } , [bookmarks])
	return (
		<BookmarksContext.Provider value={{ bookmarks, handleBookmarkIds }}>
			{children}
		</BookmarksContext.Provider>
	);
}
