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


function App() {

    /* =====================================================
       SEARCH STATE
       ===================================================== */

    const [
        searchText,
        setSearchText,
    ] = useState("");


    /* =====================================================
       DEBOUNCE SEARCH

       User types → wait 200ms → API request
       ===================================================== */

    const debouncedSearchText = useDebounce(
        searchText,
        200
    );


    /* =====================================================
       ACTIVE JOB

       Gets the job ID from:

       URL → #123

       Then fetches:

       GET /123
       ===================================================== */

    const {
        jobItem,
        isLoading: isLoadingJob,
    } = useActiveJobItem();


    /* =====================================================
       JOB LIST

       Gets jobs based on search text.

       Example:

       searchText = "react"

       → GET /?search=react
       ===================================================== */

    const {
        jobItems,
        isLoading,
        totalNumberOfResults,
    } = useJobItems({
        searchText: debouncedSearchText,
    });


    /* =====================================================
       RENDER
       ===================================================== */

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
                        jobitems={jobItems}
                        isloading={isLoading}
                    />


                    {/* Pagination */}
                    <Pagination />

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