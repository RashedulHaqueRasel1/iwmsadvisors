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
        <div className="fixed inset-0 z-[80] bg-white">
          <div className="flex h-full flex-col">
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
              <div className="container mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <Link
                  href={href}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Open standalone page
                </Link>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-red-500 border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <X className="h-4 w-4" />
                  Close
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-white py-8 sm:py-10">
              <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <LegalDocumentContent documentKey={documentKey} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LegalDocumentModalLink;
