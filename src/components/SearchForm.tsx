import { useEffect, useState } from "react";

export default function SearchForm() {
	const [searchtext, setseachtext] = useState("");
	useEffect(() => {
		if (!searchtext) return 
		fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchtext}`)
		.then((res) => res.json())
		.then((data) => console.log(data))


	} ,[searchtext])
	



	return (
		<form action="#" className="search" onSubmit={(e) => e.preventDefault()}>
			<button type="submit">
				<i className="fa-solid fa-magnifying-glass"></i>
			</button>

			<input
				onChange={(e) => {
					setseachtext(e.target.value);
					
				}}
				spellCheck="false"
				type="text"
				required
				placeholder="Find remote developer jobs..."
				value={searchtext}

			/>
		</form>
	);
	
}
