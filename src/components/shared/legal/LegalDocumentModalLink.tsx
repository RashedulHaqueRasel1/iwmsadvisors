"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import LegalDocumentContent, {
  getLegalDocumentPath,
  LegalDocumentKey,
} from "./LegalDocumentContent";

type LegalDocumentModalLinkProps = {
  documentKey: LegalDocumentKey;
  children: React.ReactNode;
  className?: string;
};

const LegalDocumentModalLink = ({
  documentKey,
  children,
  className,
}: LegalDocumentModalLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const href = getLegalDocumentPath(documentKey);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <a
        href={href}
        className={className}
        onClick={(event) => {
          event.preventDefault();
          setIsOpen(true);
        }}
      >
        {children}
      </a>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/45 p-4 sm:p-6"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="flex max-h-[min(90vh,900px)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">
                  {documentKey === "privacy-policy"
                    ? "Privacy Policy"
                    : "Terms of Service"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-2 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
              <LegalDocumentContent documentKey={documentKey} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LegalDocumentModalLink;
