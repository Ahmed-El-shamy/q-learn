"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CourseFilters,
  CoursesFilterContext,
  SortBy,
} from "../_types/courses.types";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";

const CourseFilterContext = createContext<CoursesFilterContext>(
  {} as CoursesFilterContext
);

export const CourseFilterProvider: FC<PropsWithChildren> = ({ children }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const filters = useMemo(() => {
    const parseCustomArray = (key: string) => {
      const rawValue = searchParams.get(key);
      if (!rawValue) return [];
      return rawValue
        .replace(/[\[\]]/g, "")
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
    };

    return {
      category_id: parseCustomArray("category_id").map(Number),
      level: parseCustomArray("level"),
      mode: parseCustomArray("mode"),
      instructor: parseCustomArray("instructor"),
      is_free: parseCustomArray("is_free"),
      rating: parseCustomArray("rating").map(Number),
      price_from: searchParams.get("price_from") || undefined,
      price_to: searchParams.get("price_to") || undefined,
      search: searchParams.get("search") || undefined,
    } as CourseFilters;
  }, [searchParams]);

  const [optimisticFilters, setoptimisticFilters] =
    useState<CourseFilters>(filters);

  const sortBy = searchParams.get("sort_by") as SortBy;

  const handleChangeFilters = useCallback(
    <K extends keyof CourseFilters>(
      key: K,
      value: CourseFilters[K],
      debounce = false
    ) => {
      setoptimisticFilters((prev) => ({
        ...prev,
        [key]: value,
      }));

      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

      const params = new URLSearchParams(window.location.search);

      params.delete(key);

      if (Array.isArray(value)) {
        const filteredValues = value.filter(
          (v) => v !== undefined && v !== null && String(v).trim() !== ""
        );

        if (filteredValues.length > 0) {
          const arrayString = `[${filteredValues.join(",")}]`;
          params.set(key, arrayString);
        }
      } else if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        params.set(key, String(value));
        if (key === "price_to" && !params.has("price_from")) {
          params.set("price_from", "0");
        }
      }
      const queryObject: Record<string, string> = {};
      params.forEach((val, k) => {
        if (val && val !== "" && val !== "undefined" && val !== "null") {
          queryObject[k] = val;
        }
      });

      const performUpdate = () => {
        router.replace({ pathname, query: queryObject }, { scroll: false });
      };

      if (debounce) {
        debounceTimerRef.current = setTimeout(performUpdate, 1000);
      } else {
        performUpdate();
      }
    },
    [pathname, router]
  );

  const setSortBy = useCallback(
    (sort: SortBy | "") => {
      const params = new URLSearchParams(window.location.search);

      if (!sort) {
        params.delete("sort_by");
      } else {
        params.set("sort_by", sort);
      }

      const queryObject = Object.fromEntries(params.entries());
      router.replace({ pathname, query: queryObject }, { scroll: false });
    },
    [pathname, router]
  );

  const resetFilters = useCallback(() => {
    setoptimisticFilters({} as CourseFilters);
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  return (
    <CourseFilterContext.Provider
      value={{
        filters: optimisticFilters,
        serverFilters: filters,
        sortBy,
        handleChangeFilters,
        resetFilters,
        setSortBy,
      }}
    >
      {children}
    </CourseFilterContext.Provider>
  );
};

export const useCoursesFilters = () => useContext(CourseFilterContext);
