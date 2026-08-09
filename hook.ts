import { useEffect, useState } from "react";
import { BASE_URL } from "./constants";
import type { JobItem } from "./types";

export default function Usejobitems({ searchtext }: { searchtext: string }) {
	const [jobitems, setjobitems] = useState<JobItem[]>([]);
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
	const jobitemssliced = jobitems.slice(0, 7);
	return { jobitemssliced, isloading };
}

export function Useactiveid() {
	const [activeid, setactiveid] = useState<null | number>(null);
	const hashchangefunction = () => {
		const id = Number(window.location.hash.slice(1));
		setactiveid(id);
	};
	useEffect(() => {
		window.addEventListener("hashchange", hashchangefunction);

		return () => {
			window.removeEventListener("hashchange", hashchangefunction);
		};
	}, []);
	return activeid;
}

export function Usejobitem(id: number | null) {
	const [jobitem, setjobitem] = useState(null);
	const [isloading, setisloading] = useState(false);

	useEffect(() => {
		if (!id) return;
		const fetchdata = async () => {
			setisloading(true);
			const response = await fetch(`${BASE_URL}/${id}`);
			const data = await response.json();
			setisloading(false);
			setjobitem(data.jobItem);
		};

		fetchdata();
	}, [id]);
	return { jobitem, isloading };
}

export function useactivejobitem() {
	const activeid = Useactiveid();
	return Usejobitem(activeid);
}
