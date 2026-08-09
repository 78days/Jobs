// import BookmarkIcon from "./BookmarkIcon";

// type typejobitem = {
// 	jobitem: {
// 		id : number;
// 		badgeLetters: string;
// 		title: string;
// 		company: string;
// 		daysAgo: number;
// 	};
// };
// export default function JobListItem({ jobitem }: typejobitem) {
// 	return (
// 		<li   href = {jobitem.id}className="job-item">
// 			<a className="job-item__link">
// 				<div className="job-item__badge">{jobitem.badgeLetters}</div>

// 				<div className="job-item__middle">
// 					<h3 className="third-heading">{jobitem.title}</h3>
// 					<p className="job-item__company">{jobitem.company}</p>
// 				</div>

// 				<div className="job-item__right">
// 					<BookmarkIcon />
// 					<time className="job-item__time">{jobitem.daysAgo}</time>
// 				</div>
// 			</a>
// 		</li>
// 	);
// }

import BookmarkIcon from "./BookmarkIcon";

type TypeJobItem = {
	jobitem: {
		id: number;
		badgeLetters: string;
		title: string;
		company: string;
		daysAgo: number;
	};
};

export default function JobListItem({ jobitem }: TypeJobItem) {
	return (
		<li className="job-item">
			<a href={`#${jobitem.id}`} className="job-item__link">
				<div className="job-item__badge">{jobitem.badgeLetters}</div>

				<div className="job-item__middle">
					<h3 className="third-heading">{jobitem.title}</h3>
					<p className="job-item__company">{jobitem.company}</p>
				</div>

				<div className="job-item__right">
					<BookmarkIcon />
					<time className="job-item__time">{jobitem.daysAgo} days ago</time>
				</div>
			</a>
		</li>
	);
}
