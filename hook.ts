import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { BASE_URL } from "./constants";
import type { JobItem, JobItemExpanded } from "./types";

/* =========================================================
   useSearchQuery
   Fetches the list of jobs based on the search text.
   ========================================================= */

export function useSearchQuery({ searchText }: { searchText: string }) {
	const { data, isLoading, isFetching } = useQuery<JobItem[]>({
		queryKey: ["job-items", searchText],

		queryFn: async () => {
			let errorMessage = "";

			try {
				const response = await axios.get(
					`${BASE_URL}?search=${encodeURIComponent(searchText)}`,
				);

				return response.data.jobItems;
			} catch (error: unknown) {
				if (error instanceof Error) {
					errorMessage = error.message;
				} else {
					errorMessage = "An unknown error occurred";
				}

				toast.error(`There was an error fetching the jobs. ${errorMessage}`);

				throw error;
			}
		},

		enabled: Boolean(searchText),

		staleTime: 1000 * 60 * 60,

		retry: false,
	});

	const jobItems = data ?? [];

	const totalNumberOfResults = jobItems.length;

	return {
		jobItems,
		isLoading,
		isFetching,
		totalNumberOfResults,
	};
}

/* =========================================================
   useJobItems
   Fetches multiple jobs using their IDs.
   ========================================================= */

export function useJobItems(ids: number[]) {
	const results = useQueries({
		queries: ids.map((id) => ({
			queryKey: ["job-item", id],

			queryFn: async () => {
				const response = await axios.get(`${BASE_URL}/${id}`);

				return response.data.jobItem as JobItemExpanded;
			},

			staleTime: 1000 * 60 * 60,

			retry: false,

			enabled: Boolean(id),
		})),
	});

	const jobItems = results
		.map((result) => result.data)
		.filter((jobItem): jobItem is JobItemExpanded => jobItem !== undefined);

	const isLoading = results.some((result) => result.isLoading);

	return {
		jobItems,
		isLoading,
	};
}

/* =========================================================
   useActiveId
   Reads the selected job ID from the URL hash.
   ========================================================= */

export function useActiveId() {
	const [activeId, setActiveId] = useState<number | null>(null);

	useEffect(() => {
		const hashChangeFunction = () => {
			const hash = window.location.hash.slice(1);

			if (!hash) {
				setActiveId(null);
				return;
			}

			const id = Number(hash);

			if (Number.isNaN(id)) {
				setActiveId(null);
				return;
			}

			setActiveId(id);
		};

		hashChangeFunction();

		window.addEventListener("hashchange", hashChangeFunction);

		return () => {
			window.removeEventListener("hashchange", hashChangeFunction);
		};
	}, []);

	return activeId;
}

/* =========================================================
   useJobItem
   Fetches one specific job.
   ========================================================= */

export function useJobItem(id: number | null) {
	const { data, isLoading, isError, error } = useQuery<JobItemExpanded>({
		queryKey: ["job-item", id],

		queryFn: async () => {
			const response = await axios.get(`${BASE_URL}/${id}`);

			return response.data.jobItem;
		},

		enabled: Boolean(id),

		staleTime: 1000 * 60 * 60,

		retry: false,

		refetchOnWindowFocus: true,
	});

	return {
		jobItem: data,
		isLoading,
		isError,
		error,
	};
}

/* =========================================================
   useActiveJobItem
   Combines URL hash with specific job fetching.
   ========================================================= */

export function useActiveJobItem() {
	const activeId = useActiveId();

	const { jobItem, isLoading, isError, error } = useJobItem(activeId);

	return {
		jobItem,
		isLoading,
		isError,
		error,
		activeId,
	};
}

/* =========================================================
   useDebounce
   Waits until the user stops changing a value.
   ========================================================= */

export function useDebounce<T>(value: T, delay = 500) {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timerId);
		};
	}, [value, delay]);

	return debouncedValue;
}
