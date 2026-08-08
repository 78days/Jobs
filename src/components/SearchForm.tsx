type searchformtype = {
	searchtext: string;
	setsearchtext: React.Dispatch<React.SetStateAction<string>>;
};
export default function SearchForm({
	searchtext,
	setsearchtext,
}: searchformtype) {
	return (
		<form action="#" className="search" onSubmit={(e) => e.preventDefault()}>
			<button type="submit">
				<i className="fa-solid fa-magnifying-glass"></i>
			</button>

			<input
				onChange={(e) => {
					setsearchtext(e.target.value);
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
