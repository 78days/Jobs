import { useEffect, useState } from "react";

export default function Usejobitems({ searchtext }: { searchtext: string }) {
	const [jobitems, setjobitems] = useState([]);
	const [isloading, setisloading] = useState(false);

	useEffect(() => {
		if (!searchtext) return;
		const fetchdata = async () => {
			setisloading(true);
			const response = await fetch(
				`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchtext}`,
			);
			const data = await response.json();
			setisloading(false);
			console.log(data);
			setjobitems(data.jobItems);
		};
		fetchdata();
	}, [searchtext]);
    const jobitemssliced = jobitems.slice(0,7)
	return { jobitemssliced, isloading };
}
