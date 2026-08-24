import type { typeSortBy } from "../../types";

export default function Sorting({
	onclick,
	sortBy,
}: {
	onclick: (newSortBy: typeSortBy) => void;
	sortBy: typeSortBy;
}) {
	return (
		<section className="sorting">
			<i className="fa-solid fa-arrow-down-short-wide"></i>

			<button
				type="button"
				className={`sorting__button sorting__button--relevant ${
					sortBy === "relevant" ? "sorting__button--active" : ""
				}`}
				onClick={() => onclick("relevant")}
			>
				Relevant
			</button>

			<button
				type="button"
				className={`sorting__button sorting__button--relevant ${
					sortBy === "recent" ? "sorting__button--active" : ""
				}`}
				onClick={() => onclick("recent")}
			>
				Recent
			</button>
		</section>
	);
}
