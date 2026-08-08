import { useEffect, useState } from "react";
import Background from "./Background.tsx";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

function App() {
	const [jobitems, setjobitems] = useState([]);
	const [searchtext, setsearchtext] = useState("");
	useEffect(() => {
		if (!searchtext) return;
		const fetchdata = async () => {
			const response = await fetch(
				`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchtext}`,
			);
			const data = await response.json();
			console.log(data);
			setjobitems(data.jobItems);
		};
		fetchdata();
	}, [searchtext]);

	return (
		<>
			<Background />
			<Header searchtext={searchtext} setsearchtext={setsearchtext} />
			<Container jobitems={jobitems} setjobitems={setjobitems} />
			<Footer />
		</>
	);
}

export default App;
