"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants, Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export function MainNav({ items, children }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="flex w-full items-center justify-between">
      {/* Brand & Main Links */}
      <div className="flex gap-6 lg:gap-10">
        <Link href="/">
          <Logo />
        </Link>
        {items?.length ? (
          <nav className="hidden gap-6 lg:flex">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-foreground/80"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        ) : null}

        {showMobileMenu && items && (
          <MobileNav items={items}>{children}</MobileNav>
        )}
      </div>

      {/* Auth Action Buttons */}
      <nav className="flex items-center gap-3">
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className={cn(buttonVariants({ size: "sm" }), "px-4")}
          >
            Login
          </Link>

          {/* FIX: Standard DropdownMenuTrigger without explicit asChild conflicts */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "cursor-pointer"
              )}
            >
              Register
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-2 w-48">
              <DropdownMenuItem asChild>
                <Link href="/register/student" className="w-full cursor-pointer">
                  Student
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/register/instructor" className="w-full cursor-pointer">
                  Instructor
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* User Profile Avatar Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mt-2 w-56">
            <DropdownMenuItem asChild>
              <Link href="/account" className="w-full cursor-pointer">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/account/enrolled-courses" className="w-full cursor-pointer">
                My Courses
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/account/certificates" className="w-full cursor-pointer">
                Testimonials & Certificates
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile Nav Toggle */}
        <button
          type="button"
          className="flex items-center space-x-2 lg:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Toggle Menu"
        >
          {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
    </div>
  );
}