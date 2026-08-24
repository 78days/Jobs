import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationProps = {
	onclick: (direction: "next" | "previous") => void;
	currentPage: number;
	totalNumberOfPages: number;
};

export default function Pagination({
	onclick,
	currentPage,
	totalNumberOfPages,
}: PaginationProps) {
	const isFirstPage = currentPage === 1;

	return (
		<section className="pagination">
			<button
				type="button"
				className={
					isFirstPage ? "pagination__button--hidden" : "pagination__button"
				}
				disabled={isFirstPage}
				onClick={() => {
					onclick("previous");
				}}
			>
				<ArrowLeftIcon />

				{`Page ${currentPage - 1}`}
			</button>

			<button
				type="button"
				className={
					currentPage === totalNumberOfPages
						? "pagination__button--hidden"
						: "pagination__button"
				}
				onClick={() => {
					onclick("next");
				}}
			>
				<ArrowRightIcon />

				{`Page ${currentPage + 1}`}
			</button>
		</section>
	);
}
