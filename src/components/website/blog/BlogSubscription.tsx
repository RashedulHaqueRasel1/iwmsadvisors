"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useBroadcastSubscribe, useSubscriberTitles } from "@/lib/hooks/useBroadcast";

const BlogSubscription = () => {
  const [email, setEmail] = useState("");
  const { mutateAsync, isPending } = useBroadcastSubscribe();
  const { data: titleData } = useSubscriberTitles();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedEmail = email.trim();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!normalizedEmail) {
      toast.error("Please enter your email address");
      return;
    }

    if (!emailRegex.test(normalizedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const response = await mutateAsync(normalizedEmail);
      const message =
        response?.message ||
        "Successfully subscribed! Check your email for confirmation.";
      toast.success(message);
      setEmail("");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  const title = titleData?.data?.[0]?.title || titleData?.data?.title;
  const subTitle = titleData?.data?.[0]?.subTitle || titleData?.data?.subTitle || "Subscribe to receive the latest articles, industry trends, and expert insights on workplace and facility management.";

  const splitTitle = (fullTitle: string) => {
    const words = fullTitle.split(" ");
    if (words.length <= 2) {
      return { main: "", highlight: fullTitle };
    }
    const highlight = words.slice(-2).join(" ");
    const main = words.slice(0, -2).join(" ") + " ";
    return { main, highlight };
  };

  const { main, highlight } = title 
    ? splitTitle(title) 
    : { main: "Stay Informed With ", highlight: "IWMS Insights" };

  return (
    <section className="w-full  my-12 md:my-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {main}
            <span className="text-primary relative">
              {highlight}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-blue-600/20"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 9C45.3333 4.33333 131.6 -1.6 198 7"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            {subTitle}
          </p>

          {/* Subscription Form */}
          <form onSubmit={handleSubscribe} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Email Input */}
              <div className="flex-1 relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-primary group-focus-within:text-blue-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your business email"
                  className="w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                  disabled={isPending}
                />
              </div>

              {/* Subscribe Button */}
              <button
                type="submit"
                disabled={isPending}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center gap-2 min-w-[140px]"
              >
                {isPending ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* Privacy Notice */}
            {/* <p className="mt-4 text-xs md:text-sm text-gray-500">
              We respect your privacy. Unsubscribe at any time.{" "}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 underline font-medium transition-colors"
                onClick={() => toast.info("Privacy policy coming soon")}
              >
                Privacy Policy
              </button>
            </p> */}
          </form>

          {/* Additional Info/Benefits */}
          {/* <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                Expert Insights
              </h4>
              <p className="text-xs text-gray-600">Industry-leading analysis</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                Latest Trends
              </h4>
              <p className="text-xs text-gray-600">Stay ahead of the curve</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                Weekly Updates
              </h4>
              <p className="text-xs text-gray-600">No spam, just value</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default BlogSubscription;
