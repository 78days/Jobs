//161-c

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { resultsPerPage } from "../../constants.ts";
import { useActiveJobItem, useDebounce, useJobItems } from "../../hook";
import type { typeSortBy } from "../../types.ts";
import Background from "./Background.tsx";
import Container from "./Container";
import Footer from "./Footer";
import Header, { Headertop } from "./Header";
import JobItemContent from "./JobItemContent";
import JobList from "./JobList";
import Logo from "./Logo";
import Pagination from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SearchForm from "./SearchForm";
import Sidebar from "./Sidebar";
import Sorting from "./SortingControls";

function App() {
	const [currentPage, setCurrentPage] = useState(1);

	const [searchText, setSearchText] = useState("");

	const debouncedSearchText = useDebounce(searchText, 200);

	const { jobItem, isLoading: isLoadingJob } = useActiveJobItem();

	const { jobItems, isLoading, totalNumberOfResults } = useJobItems({
		searchText: debouncedSearchText,
	});

	const [sortBy, setSortBy] = useState<typeSortBy>("relevant");

	const totalNumberOfPages = Math.ceil(totalNumberOfResults / resultsPerPage);

	const handleChangePage = (direction: "next" | "previous") => {
		if (direction === "next") {
			setCurrentPage((prev) => prev + 1);
		} else {
			setCurrentPage((prev) => prev - 1);
		}
	};

	const handleChangeSortBy = (newSortBy: typeSortBy) => {
		setSortBy(newSortBy);
		setCurrentPage(1);
	};

	const jobItemsSorted = [...jobItems].sort((a, b) => {
		if (sortBy === "relevant") {
			return b.relevanceScore - a.relevanceScore;
		} else {
			return a.daysAgo - b.daysAgo;
		}
	});
	const jobItemsSlicedandSorted = jobItemsSorted.slice(
		currentPage * resultsPerPage - resultsPerPage,
		currentPage * resultsPerPage,
	);

	return (
		<>
			<Background />

			<Header>
				<Headertop>
					<Logo />
				</Headertop>

				<SearchForm searchText={searchText} setSearchText={setSearchText} />
			</Header>

			<Container>
				<Sidebar>
					<div className="sidebar__top">
						<ResultsCount totalnumberofresults={totalNumberOfResults} />

						<Sorting onclick={handleChangeSortBy} sortBy={sortBy} />
					</div>

					<JobList jobitems={jobItemsSlicedandSorted} isloading={isLoading} />

					<Pagination
						onclick={handleChangePage}
						currentPage={currentPage}
						totalNumberOfPages={totalNumberOfPages}
					/>
				</Sidebar>

				<JobItemContent jobitem={jobItem ?? null} isloading={isLoadingJob} />
			</Container>

			<Footer />
			<Toaster position="top-right" />
		</>
	);
}

export default App;
