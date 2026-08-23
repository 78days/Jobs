import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

import { BASE_URL } from "./constants";
import type { JobItem } from "./types";
import toast from "react-hot-toast";

/* =========================================================
   useJobItems

   Fetches the list of jobs based on the search text.
   ========================================================= */

export function useJobItems({
    searchText,
}: {
    searchText: string;
}) {
    const { data, isPending, isFetching } = useQuery<JobItem[]>({
        queryKey: ["job-items", searchText],

        queryFn: async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}?search=${encodeURIComponent(searchText)}`
                );
                return response.data.jobItems;
            } catch (error : unknown)  {
                toast.error(`There was an error fetching the jobs. ${error.message}`);
                throw error; // CRITICAL: Tells React Query the request failed
            }
        },

        // Don't make a request when search is empty
        enabled: Boolean(searchText),

        // Data remains fresh for 1 hour
        staleTime: 1000 * 60 * 60,

        retry: false,
    });

    const jobItems = data ?? [];

    // Only show first 7 jobs
    const jobItemsSliced = jobItems.slice(0, 7);

    // Total results before slicing
    const totalNumberOfResults = jobItems.length;

    return {
        jobItems: jobItemsSliced,
        isLoading: isPending, // Note: TanStack v5 renamed isLoading to isPending
        isFetching,
        totalNumberOfResults,
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

            // No hash
            if (!hash) {
                setActiveId(null);
                return;
            }

            const id = Number(hash);

            // Invalid hash
            if (Number.isNaN(id)) {
                setActiveId(null);
                return;
            }

            setActiveId(id);
        };

        // Check the current hash immediately
        hashChangeFunction();

        // Listen for future hash changes
        window.addEventListener(
            "hashchange",
            hashChangeFunction
        );

        return () => {
            window.removeEventListener(
                "hashchange",
                hashChangeFunction
            );
        };
    }, []);

    return activeId;
}


/* =========================================================
   useJobItem

   Fetches one specific job.
   ========================================================= */

export function useJobItem(id: number | null) {
    const {
        data,
        isPending,
        isError,
        error,
    } = useQuery<JobItem>({
        queryKey: ["job-item", id],

        queryFn: async () => {
            const response = await axios.get(
                `${BASE_URL}/${id}`
            );
            return response.data.jobItem;
        },

        // Only fetch when an ID exists
        enabled: Boolean(id),

        // Cache/freshness
        staleTime: 1000 * 60 * 60,

        // Don't automatically retry failed requests
        retry: false,

        // Refetch when browser window gets focus
        refetchOnWindowFocus: true,
    });

    return {
        jobItem: data,
        isLoading: isPending,
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

    const {
        jobItem,
        isLoading,
        isError,
        error,
    } = useJobItem(activeId);

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

export function useDebounce<T>(
    value: T,
    delay = 500
) {
    const [
        debouncedValue,
        setDebouncedValue,
    ] = useState<T>(value);

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
