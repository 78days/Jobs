import BookmarkIcon from "./BookmarkIcon";
import Logo from "./Logo";
import SearchForm from "./SearchForm";

export default function Header({ searchtext, setsearchtext }) {
	return (
		<header className="header">
			<div className="header__top">
				<Logo />
				<BookmarkIcon />
			</div>
			<SearchForm searchtext={searchtext} setsearchtext={setsearchtext} />
		</header>
	);
}
