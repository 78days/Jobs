import { useEffect, useState } from "react";
import Usejobitems, { Useactiveid } from "../../hook";
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

function App() {
	const [searchtext, setsearchtext] = useState("");
	const { jobitemssliced: jobitems, isloading } = Usejobitems({ searchtext });
	const activeid = Useactiveid();
	console.log(activeid);
	return (
		<>
			<Background />
			<Header>
				<Headertop>
					<Logo />
					<BookmarkIcon />
				</Headertop>
				<SearchForm searchtext={searchtext} setsearchtext={setsearchtext} />
			</Header>
			<Container>
				<Sidebar>
					<div className="sidebar__top">
						<ResultsCount />
						<Sorting />
					</div>
					<JobList jobitems={jobitems} isloading={isloading} />
					<Pagination />
				</Sidebar>
				<JobItemContent />
			</Container>
			<Footer />
		</>
	);
}

export default App;
