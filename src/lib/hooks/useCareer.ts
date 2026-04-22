"use client";
import { useQuery } from "@tanstack/react-query";
import { getCareers, getSingleCareer } from "../api/api";

export function useCareers() {
  return useQuery({
    queryKey: ["careers"],
    queryFn: getCareers,
  });
}

export function useSingleCareer(id: string) {
  return useQuery({
    queryKey: ["single-career", id],
    queryFn: () => getSingleCareer(id),
    enabled: !!id,
  });
}
