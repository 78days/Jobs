import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { BASE_URL } from "./constants";
import type { JobItem } from "./types";

export default function Usejobitems({
  searchtext,
}: {
  searchtext: string;
}) {
  const [jobitems, setjobitems] = useState<JobItem[]>([]);
  const [isloading, setisloading] = useState(false);

  useEffect(() => {
    if (!searchtext) return;

    const fetchdata = async () => {
      setisloading(true);

      const response = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchtext}`
      );

      const data = await response.json();

      setisloading(false);
      setjobitems(data.jobItems);
    };

    fetchdata();
  }, [searchtext]);

  const totalnumberofresults = jobitems.length;
  const jobitemssliced = jobitems.slice(0, 7);

  return {
    jobitemssliced,
    isloading,
    totalnumberofresults,
  };
}

export function Useactiveid() {
  const [activeid, setactiveid] = useState<number | null>(null);

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
  const { data, isLoading } = useQuery({
    queryKey: ["job-item", id],

    queryFn: async () => {
      if (!id) return null;

      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();

      return data.jobItem;
    },

    staleTime: 1000 * 60 * 60,
    retry: false,
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
  });

  return {
    jobitem: data,
    isLoading,
  } as const;
}

export function useactivejobitem() {
  const activeid = Useactiveid();

  return Usejobitem(activeid);
}

export function UseDebounce<T>(value: T, delay = 500) {
  const [debouncedvalue, setdebouncedvalue] = useState<T>(value);

  useEffect(() => {
    const timerid = setTimeout(() => {
      setdebouncedvalue(value);
    }, delay);

    return () => {
      clearTimeout(timerid);
    };
  }, [value, delay]);

  return debouncedvalue;
}