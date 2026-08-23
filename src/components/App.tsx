import { useState } from "react";

import {
    useActiveJobItem,
    useDebounce,
    useJobItems,
} from "../../hook";

import Background from "./Background.tsx";
import BookmarkIcon from "./BookmarkIcon";
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
import { Toaster } from "react-hot-toast";
import { resultsPerPage } from "../../constants.ts";


function App() {



	const [currentPage ,  setCurrentPage] = useState(1)
	

    const [
        searchText,
        setSearchText,
    ] = useState("");


    const debouncedSearchText = useDebounce(
        searchText,
        200
    );



    const {
        jobItem,
        isLoading: isLoadingJob,
    } = useActiveJobItem();


    const {
        jobItems,
        isLoading,
        totalNumberOfResults,
    } = useJobItems({
        searchText: debouncedSearchText,
    });
	const jobItemsSliced = jobItems.slice(currentPage * resultsPerPage - resultsPerPage, currentPage*resultsPerPage);
	const totalNumberOfPages = Math.ceil(totalNumberOfResults / 7)


	const handleChangePage = (direction : "next" | "previous") => {
		if(direction==="next"){
			setCurrentPage((prev) => prev + 1)
		}
		else{
			setCurrentPage((prev) => prev - 1)
		}
	}


    return (
        <>
            {/* Background */}
            <Background />


            {/* Header */}
            <Header>

                <Headertop>

                    <Logo />

                    <BookmarkIcon />

                </Headertop>


                {/* Search */}
                <SearchForm
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

            </Header>


            {/* Main container */}
            <Container>

                {/* =========================================
                    SIDEBAR
                    ========================================= */}

                <Sidebar>

                    <div className="sidebar__top">

                        {/* Results count */}
                        <ResultsCount
                            totalnumberofresults={
                                totalNumberOfResults
                            }
                        />


                        {/* Sorting */}
                        <Sorting />

                    </div>


                    {/* Job list */}
                    <JobList
                        jobitems={jobItemsSliced}
                        isloading={isLoading}
                    />


                    {/* Pagination */}
                    <Pagination onclick = {handleChangePage} currentPage = {currentPage} totalNumberOfPages = {totalNumberOfPages}/>

                </Sidebar>


                {/* =========================================
                    SELECTED JOB
                    ========================================= */}

                <JobItemContent
                    jobitem={jobItem}
                    isloading={isLoadingJob}
                />

            </Container>


            {/* Footer */}
            <Footer />
			<Toaster position="top-right" />
        </>
    );
}


export default App;