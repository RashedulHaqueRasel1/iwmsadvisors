"use client";
import { useQuery } from "@tanstack/react-query";
import {
  getServices,
  getSingleServices,
  getServicePageTitle,
} from "../api/api";

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });
}

export function useSingleService(id: string) {
  return useQuery({
    queryKey: ["single-service", id],
    queryFn: () => getSingleServices(id),
    enabled: !!id,
  });
}

export function useServicePageTitle() {
  return useQuery({
    queryKey: ["service-page-title"],
    queryFn: getServicePageTitle,
  });
}
