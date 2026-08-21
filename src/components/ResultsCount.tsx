type totalresultcount = {
	totalnumberofresults: number;
};

export default function ResultsCount({
	totalnumberofresults,
}: totalresultcount) {
	return (
		<p className="count">
			<span className="u-bold">{totalnumberofresults}</span> results
		</p>
	);
}
