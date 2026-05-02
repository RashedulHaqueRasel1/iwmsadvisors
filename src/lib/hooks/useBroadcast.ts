"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { postBroadcastSubscribe, getSubscriberTitles } from "../api/api";

export function useBroadcastSubscribe() {
  return useMutation({
    mutationFn: (email: string) => postBroadcastSubscribe(email),
  });
}

export function useSubscriberTitles() {
  return useQuery({
    queryKey: ["subscriber-titles"],
    queryFn: getSubscriberTitles,
  });
}
