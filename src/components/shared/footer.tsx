"use client";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import CustomImage from "@/components/shared/CustomImage";
import LegalDocumentModalLink from "@/components/shared/legal/LegalDocumentModalLink";
import { useFooter } from "@/lib/hooks/useCms";

type FooterLink = {
  label: string;
  url: string;
};

type FooterApiData = {
  logo?: string;
  description?: string;
  email?: string;
  phone?: string;
  quickLinks?: FooterLink[];
  consultingLinks?: FooterLink[];
  contactLinks?: FooterLink[];
  copyright?: string;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
};

type FooterApiResponse = {
  status?: boolean;
  message?: string;
  data?: FooterApiData;
};

const isExternalUrl = (value?: string) =>
  !!value && /^https?:\/\//i.test(value);
const isInternalUrl = (value?: string) => !!value && value.startsWith("/");

const getSafeHref = (value?: string) => {
  if (isExternalUrl(value) || isInternalUrl(value)) return value as string;
  return "#";
};

const formatPhoneHref = (value?: string) => {
  if (!value) return "tel:+14454455";
  return `tel:${value.replace(/[^+\d]/g, "")}`;
};

const requiredContactLinks: FooterLink[] = [
  { label: "Privacy Policy", url: "/privacy-policy" },
  { label: "Terms & Conditions", url: "/terms-and-conditions" },
];

const mergeRequiredLinks = (links: FooterLink[]) => {
  const normalizedUrls = new Set(links.map((item) => item.url));
  const missingLinks = requiredContactLinks.filter(
    (item) => !normalizedUrls.has(item.url),
  );

  return [...links, ...missingLinks];
};

const renderLinkItem = (item: FooterLink, key: string) => {
  const href = getSafeHref(item.url);

  if (href === "/privacy-policy" || href === "/terms-and-conditions") {
    return (
      <li key={key}>
        <LegalDocumentModalLink
          documentKey={
            href === "/privacy-policy"
              ? "privacy-policy"
              : "terms-and-conditions"
          }
          className="text-[15px] text-white/90 hover:text-white transition-colors"
        >
          {item.label}
        </LegalDocumentModalLink>
      </li>
    );
  }

  if (isInternalUrl(href)) {
    return (
      <li key={key}>
        <Link
          href={href}
          className="text-[15px] text-white/90 hover:text-white transition-colors"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li key={key}>
      <a
        href={href}
        target={isExternalUrl(href) ? "_blank" : undefined}
        rel={isExternalUrl(href) ? "noopener noreferrer" : undefined}
        className="text-[15px] text-white/90 hover:text-white transition-colors"
      >
        {item.label}
      </a>
    </li>
  );
};

const Footer = () => {
  const { data: footerData } = useFooter();
  const footer = (footerData as FooterApiResponse | undefined)?.data;

  const quickLinks = footer?.quickLinks ?? [];
  const consultingLinks = footer?.consultingLinks ?? [];
  const contactLinks = mergeRequiredLinks(footer?.contactLinks ?? []);

  const socialLinks = [
    {
      name: "Twitter",
      icon: <FaTwitter className="h-5 w-5" />,
      href: getSafeHref(footer?.socialLinks?.twitter) || "https://twitter.com",
      backgroundColor: "#1DA1F2",
      iconColor: "#FFFFFF",
    },
    {
      name: "Facebook",
      icon: <FaFacebookF className="h-5 w-5" />,
      href:
        getSafeHref(footer?.socialLinks?.facebook) || "https://facebook.com",
      backgroundColor: "#1877F2",
      iconColor: "#FFFFFF",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn className="h-5 w-5" />,
      href:
        getSafeHref(footer?.socialLinks?.linkedin) || "https://linkedin.com",
      backgroundColor: "#0A66C2",
      iconColor: "#FFFFFF",
    },
  ].map((item) => ({
    ...item,
    href:
      item.href === "#"
        ? item.name === "LinkedIn"
          ? "https://linkedin.com"
          : `https://${item.name.toLowerCase()}.com`
        : item.href,
  }));

  const fallbackLinks = {
    quickLinks: [
      { label: "Home", url: "/" },
      { label: "Services", url: "/services" },
      { label: "Case Studies", url: "/case-study" },
      { label: "About", url: "/about" },
      { label: "Insights", url: "/insights" },
      { label: "Careers", url: "/career" },
    ],
    consultingLinks: [
      // { label: "IWMS Consulting", url: "/services" },
      // { label: "IWMS Implementation", url: "/services" },
      // { label: "System Integration", url: "/services" },
      // { label: "Managed Support", url: "/services" },
    ],
    contactLinks: [
      { label: "Contact us", url: "/contact" },
      { label: "FAQ", url: "/faq" },
      ...requiredContactLinks,
    ],
  };

  return (
    <footer className="mt-16 w-full bg-[#0b4f81] text-white">
      <div className="container mx-auto px-4 pt-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block">
              <CustomImage
                src={footer?.logo || "/logo/fotter-logo-2.png"}
                alt="IWMS Advisors Footer Logo"
                width={100}
                height={42}
                className="h-10 w-auto"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/90">
              {footer?.description ||
                "We are working to make your transform Saas company a global brand. Saasinyo is the best company."}
            </p>

            <div className="mt-7 space-y-3">
              <a
                href={`mailto:${footer?.email || "info@iwmsadvisors.com"}`}
                className="flex w-fit items-center gap-3 text-sm text-white/90 hover:text-white"
              >
                <Mail className="h-4 w-4" />
                <span>{footer?.email || "info@iwmsadvisors.com"}</span>
              </a>
              <a
                href={formatPhoneHref(footer?.phone)}
                className="flex w-fit items-center gap-3 text-sm text-white/90 hover:text-white"
              >
                <Phone className="h-4 w-4" />
                <span>{footer?.phone || "+1 445 45 55"}</span>
              </a>

              {/* IBM Partner Logo */}
              <div className="-ml-8 -mt-6">
                <CustomImage
                  src="/images/IBM-Silver-Partner-2.png"
                  alt="IBM Silver Partner"
                  width={160}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:pt-1">
            <ul className="space-y-3">
              {(quickLinks.length ? quickLinks : fallbackLinks.quickLinks).map(
                (item, index) => renderLinkItem(item, `quick-${index}`),
              )}
            </ul>
          </div>

          <div className="lg:col-span-2 lg:pt-1">
            <ul className="space-y-3">
              {(consultingLinks.length
                ? consultingLinks
                : fallbackLinks.consultingLinks
              ).map((item, index) =>
                renderLinkItem(item, `consulting-${index}`),
              )}
            </ul>
          </div>

          <div className="lg:col-span-3 lg:pt-1">
            <ul className="space-y-3">
              {(contactLinks.length
                ? contactLinks
                : fallbackLinks.contactLinks
              ).map((item, index) => renderLinkItem(item, `contact-${index}`))}
            </ul>
          </div>
        </div>
      </div>

      <div className=" w-full border-t border-white/40">
        <div className="container mx-auto flex flex-col gap-4 px-4 py-7 text-sm text-white/90 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>
            {footer?.copyright ||
              "Copyright © 2026 IWMS Advisors. All Rights Reserved."}
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={isExternalUrl(social.href) ? "_blank" : undefined}
                rel={
                  isExternalUrl(social.href) ? "noopener noreferrer" : undefined
                }
                aria-label={social.name}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full shadow-sm ring-1 ring-white/20 transition-all hover:scale-105"
                style={{
                  backgroundColor: social.backgroundColor,
                  color: social.iconColor,
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
