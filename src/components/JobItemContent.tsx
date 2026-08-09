import type { JobItemExpanded } from "../../types";
import BookmarkIcon from "./BookmarkIcon";
import Spinner from "./Spinner";

type jobitemprop = {
	jobitem: JobItemExpanded | null;
	isloading: boolean;
};
export default function JobItemContent({ jobitem, isloading }: jobitemprop) {
	if (isloading) {
		return (
			<section className="job-details">
				<div>
					<Spinner />
				</div>
			</section>
		);
	}

	if (!jobitem) return <EmptyJobContent />;

	return (
			<section className="job-details">
				<div>
					<img
						src= {jobitem.coverImgURL}
						alt="#"
					/>

					<a
						className="apply-btn"
						href= {jobitem.companyURL}
						target="_blank"
						rel="noopener"
					>
						Apply
					</a>

					<section className="job-info">
						<div className="job-info__left">
							<div className="job-info__badge">{jobitem.badgeLetters}</div>
							<div className="job-info__below-badge">
								<time className="job-info__time">{jobitem.daysAgo}</time>

								<BookmarkIcon />
							</div>
						</div>

						<div className="job-info__right">
							<h2 className="second-heading">{jobitem.title}</h2>
							<p className="job-info__company">{jobitem.company}</p>
							<p className="job-info__description">{jobitem.description}</p>
							<div className="job-info__extras">
								<p className="job-info__extra">
									<i className="fa-solid fa-clock job-info__extra-icon"></i>
									{jobitem.duration}
								</p>
								<p className="job-info__extra">
									<i className="fa-solid fa-money-bill job-info__extra-icon"></i>
									{jobitem.salary}
								</p>
								<p className="job-info__extra">
									<i className="fa-solid fa-location-dot job-info__extra-icon"></i>{" "}
									{jobitem.location}
								</p>
							</div>
						</div>
					</section>

					<div className="job-details__other">
						<section className="qualifications">
							<div className="qualifications__left">
								<h4 className="fourth-heading">Qualifications</h4>
								<p className="qualifications__sub-text">
									Other qualifications may apply
								</p>
							</div>
							<ul className="qualifications__list">
								{
									jobitem.qualifications.map((qualification  : string) => (
										<li key = {jobitem.id}className="qualifications__item">{qualification}</li>
									))
								}
								
								
							</ul>
						</section>

						<section className="reviews">
							<div className="reviews__left">
								<h4 className="fourth-heading">Company reviews</h4>
								<p className="reviews__sub-text">
									Recent things people are saying
								</p>
							</div>
							<ul className="reviews__list">
								{jobitem.reviews.map((review : string) => (
									<li key={jobitem.id} className="reviews__item">{review}</li>
								))}
								
								
							</ul>
						</section>
					</div>

					<footer className="job-details__footer">
						<p className="job-details__footer-text">
							If possible, please reference that you found the job on{" "}
							<span className="u-bold">Jobs</span>, we would really appreciate
							it!
						</p>
					</footer>
				</div>
			</section>
		);
}

export function EmptyJobContent() {
	return (
		<section className="job-details">
			<div>
				<div className="job-details__start-view">
					<p>What are you looking for?</p>
					<p>
						Start by searching for any technology your ideal job is working with
					</p>
				</div>
			</div>
		</section>
	);
}
