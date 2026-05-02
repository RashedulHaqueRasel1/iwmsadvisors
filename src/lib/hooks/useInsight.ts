'use client';
import { useQuery } from "@tanstack/react-query";
import { getInsights } from "../api/api";

export function useInsight() {
  return useQuery({
    queryKey: ["insights"],
    queryFn: () => getInsights(),
  });
}
