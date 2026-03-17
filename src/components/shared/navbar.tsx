"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";

import { Button } from "@/components/ui/button";
import CustomImage from "@/components/shared/CustomImage";
import { useNavbar } from "@/lib/hooks/useCms";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blogs" },
  { label: "About", href: "/about" },
];

// Animation variants
const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const menuItemVariants = {
  closed: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: navbarData } = useNavbar();

  const logo = navbarData?.data?.logo || "/logo/logo-xl.svg";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    // Prevent scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200 bg-white/90 backdrop-blur-md py-2 shadow-sm"
          : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto flex w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="relative z-[60] flex items-center gap-2"
          onClick={closeMenu}
        >
          <CustomImage
            src={logo}
            alt="IWMS Advisors Logo"
            width={240}
            height={80}
            className="h-10 w-auto object-contain sm:h-12 md:h-14 lg:h-16 xl:h-20"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-base font-medium md:flex">
          {navItems.map((item, index) => {
            const active = isActive(item.href);

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-1 py-1 transition-colors ${
                    active
                      ? "text-primary font-semibold"
                      : "text-slate-600 hover:text-primary"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              className="h-10 rounded-full px-6 text-xs font-bold uppercase tracking-widest shadow-md transition-all hover:shadow-lg active:scale-95"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </nav>

        {/* Animated Hamburger Menu Button */}
        <motion.button
          type="button"
          className="relative z-[60] inline-flex items-center justify-center rounded-full p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <span className="sr-only">Toggle menu</span>
          <div className="relative h-6 w-6">
            <motion.span
              className="absolute left-0 top-[6px] h-0.5 w-6 bg-current"
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute left-0 top-[12px] h-0.5 w-6 bg-current"
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute left-0 top-[18px] h-0.5 w-6 bg-current"
              animate={
                isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.button>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-50 bg-white md:hidden"
          >
            <motion.nav
              className="flex h-full flex-col gap-1 overflow-y-auto px-4 pb-6 pt-24 sm:px-6"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
            >
              {navItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <motion.div
                    key={item.href}
                    variants={menuItemVariants}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-lg px-4 py-4 text-2xl font-medium transition-colors ${
                        active
                          ? "bg-primary/5 text-primary font-bold"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div variants={menuItemVariants} className="mt-6">
                <Button
                  className="h-14 w-full rounded-2xl text-sm font-bold uppercase tracking-widest shadow-xl"
                  asChild
                >
                  <Link href="/contact" onClick={closeMenu}>
                    Contact Us
                  </Link>
                </Button>
              </motion.div>

              {/* Social Links or Additional Info */}
              <motion.div
                variants={menuItemVariants}
                className="mt-auto flex flex-col items-center gap-4 pb-8"
              >
                <div className="h-px w-full bg-slate-100" />
                <p className="text-sm text-slate-500">
                  © {new Date().getFullYear()} IWMS Advisors
                </p>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
