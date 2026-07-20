"use client";

import React, { useState } from "react";
import { postApplication } from "@/lib/api/api";
import { toast } from "sonner";
import LegalDocumentModalLink from "@/components/shared/legal/LegalDocumentModalLink";

interface UnknownRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UnknownRoleModal = ({ isOpen, onClose }: UnknownRoleModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resumeCV: null as File | null,
    coverLetter: "",
    portfolioUrl: "",
    linkedInProfile: "",
    isAgreed: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should not exceed 5MB");
        return;
      }
      setFormData((prev) => ({ ...prev, resumeCV: file }));
    }
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }
    if (!formData.resumeCV) {
      toast.error("Please upload your resume");
      return false;
    }
    if (!formData.isAgreed) {
      toast.error("Please agree to the terms and privacy policy");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      resumeCV: null,
      coverLetter: "",
      portfolioUrl: "",
      linkedInProfile: "",
      isAgreed: false,
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("coverLetter", formData.coverLetter || "");
      form.append("portfolioUrl", formData.portfolioUrl || "");
      form.append("linkedInProfile", formData.linkedInProfile || "");
      form.append("isAgreed", String(formData.isAgreed));
      if (formData.resumeCV) {
        form.append("resumeCV", formData.resumeCV);
      }

      await postApplication(form);
      toast.success("Application submitted successfully!");
      handleClose();
    } catch (error) {
      toast.error(
        (error as Error)?.message ||
          "Failed to submit application. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[50] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-5 rounded-t-2xl flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Apply for Unknown Role
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              We&apos;ll reach out if there&apos;s a match
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm"
              disabled={isSubmitting}
            />
          </div>

          {/* Email & Phone */}
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

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Resume (CV) <span className="text-red-600">*</span>
            </label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-600 transition-colors cursor-pointer group">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isSubmitting}
              />
              <div className="pointer-events-none">
                <svg
                  className="w-10 h-10 text-gray-400 mx-auto mb-2 group-hover:text-blue-600 transition-colors"
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
                <p className="text-gray-600 font-semibold text-sm">
                  Drag & drop or click to browse
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>
            </div>
            {formData.resumeCV && (
              <div className="mt-2 flex items-center gap-2 text-green-600">
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
                  {formData.resumeCV.name}
                </span>
              </div>
            )}
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Cover Letter
            </label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              placeholder="Tell the employer why you're a great fit for this role."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm resize-vertical"
              disabled={isSubmitting}
            />
          </div>

          {/* Portfolio URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Portfolio URL
            </label>
            <input
              type="url"
              name="portfolioUrl"
              value={formData.portfolioUrl}
              onChange={handleInputChange}
              placeholder="https://test.iwmsadvisors.com/"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm"
              disabled={isSubmitting}
            />
          </div>

          {/* LinkedIn Profile */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              LinkedIn Profile
            </label>
            <input
              type="url"
              name="linkedInProfile"
              value={formData.linkedInProfile}
              onChange={handleInputChange}
              placeholder="https://www.linkedin.com/in/yourprofile/"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm"
              disabled={isSubmitting}
            />
          </div>

          {/* Terms Checkbox */}
          <div className="border-t border-gray-200 pt-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isAgreed"
                checked={formData.isAgreed}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-600 cursor-pointer mt-1"
                disabled={isSubmitting}
              />
              <span className="text-sm text-gray-600">
                I confirm that the information provided is accurate and agree to
                the{" "}
                <LegalDocumentModalLink
                  documentKey="privacy-policy"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  privacy policy
                </LegalDocumentModalLink>{" "}
                and{" "}
                <LegalDocumentModalLink
                  documentKey="terms-and-conditions"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  terms of service
                </LegalDocumentModalLink>
                .
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
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
  );
};

export default UnknownRoleModal;
