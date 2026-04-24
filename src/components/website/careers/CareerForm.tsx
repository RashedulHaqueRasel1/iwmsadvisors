"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCareers, useSingleCareer } from "@/lib/hooks/useCareer";
import { postCareerApplication } from "@/lib/api/api";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { Career } from "@/lib/type/career";

const CareerForm = () => {
  const router = useRouter();
  const params = useParams();
  const careerIdParam = params?.id as string;

  const { data: careersData, isLoading: isListLoading } = useCareers();
  const careers = careersData?.data || [];

  // Find the career ID from the slug or use the slug itself as the ID fallback
  const matchedCareer = (careers as Career[]).find((c: Career) => {
    if (!c.title) return c._id === careerIdParam;
    const s = slugify(c.title).toLowerCase().trim();
    const targetSlug = careerIdParam?.toLowerCase().trim();
    return s === targetSlug || c._id === careerIdParam;
  });

  const careerId = matchedCareer?._id || (!isListLoading ? careerIdParam : "");

  const { data: careerData, isLoading: isDetailLoading } = useSingleCareer(
    careerId || "",
  );
  const career = careerData?.data;

  const isPageLoading = isListLoading || (isDetailLoading && careerId);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null as File | null,
    resumeLink: "",
    portfolioLink: "",
    coverLetter: "",
    notes: "",
    agreedToTerms: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should not exceed 5MB");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        resume: file,
      }));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your full name");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!formData.resume) {
      toast.error("Please upload your resume");
      return false;
    }

    if (!formData.agreedToTerms) {
      toast.error("Please agree to the terms and privacy policy");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("resumeLink", formData.resumeLink || "");
      form.append("portfolioLink", formData.portfolioLink || "");
      form.append("coverLetter", formData.coverLetter || "");
      form.append("notes", formData.notes || "");
      form.append("careerId", careerId);

      if (formData.resume) {
        form.append("resume", formData.resume);
      }

      await postCareerApplication(form, careerId);

      toast.success("Application submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        resume: null,
        resumeLink: "",
        portfolioLink: "",
        coverLetter: "",
        notes: "",
        agreedToTerms: false,
      });

      // Redirect after success
      setTimeout(() => {
        router.push("/careers");
      }, 2000);
    } catch (error) {
      toast.error(
        (error as Error)?.message ||
          "Failed to submit application. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPageLoading) {
    return (
      <div className="w-full bg-gradient-to-b from-gray-50 to-white min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-slate-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-slate-100 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href={career ? `/careers/${slugify(career.title)}` : "/careers"}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 group"
        >
          <div className="p-2 rounded-full bg-white shadow-sm group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="font-medium">Back to {career ? "Job Details" : "Careers"}</span>
        </Link>

        <div className=" mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Complete Your Application
            </h1>
            {career && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {career.title}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {career.department} • {career.location} • {career.type}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Application Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8"
          >
            {/* Application Details Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Application Details
              </h3>

              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Email & Phone Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Upload Section */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Resume & Documents
              </h3>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Upload Resume <span className="text-red-600">*</span>
                </label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-600 transition-colors cursor-pointer group">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isSubmitting}
                  />
                  <div className="pointer-events-none">
                    <svg
                      className="w-12 h-12 text-gray-400 mx-auto mb-3 group-hover:text-blue-600 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-gray-600 font-semibold">
                      Drag & drop to upload or click to browse
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Accepted formats: PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>
                </div>
                {formData.resume && (
                  <div className="mt-3 flex items-center gap-2 text-green-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      {formData.resume.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Cover Letter and Notes Section */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Cover Letter & Notes
              </h3>

              <div className="space-y-6">
                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    placeholder="Tell us why you're a great fit for this role..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm resize-vertical"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Anything else you'd like us to know?"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm resize-vertical"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* External Links Section */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                External Links
              </h3>

              <div className="space-y-6">
                {/* Resume Link */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Resume Link
                  </label>
                  <input
                    type="url"
                    name="resumeLink"
                    value={formData.resumeLink}
                    onChange={handleInputChange}
                    placeholder="https://example.com/resume"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Portfolio Link */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Portfolio Link
                  </label>
                  <input
                    type="url"
                    name="portfolioLink"
                    value={formData.portfolioLink}
                    onChange={handleInputChange}
                    placeholder="https://example.com/portfolio"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="border-t border-gray-200 pt-8">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-600 cursor-pointer mt-1"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-gray-600">
                  I confirm that the information provided is accurate and agree
                  to the{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    privacy policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    terms of service
                  </a>
                  .
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-200 pt-8 flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                disabled={isSubmitting}
                className="flex-1 py-4 cursor-pointer px-6 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 cursor-pointer py-4 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
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
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Application</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CareerForm;
