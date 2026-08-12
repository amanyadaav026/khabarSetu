import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutSuccess } from "../../app/user/userSlice";
import TopBar from "./TopBar";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "News",
      path: "/news",
    },
    {
      name: "About",
      path: "/about",
    },
  ];

  return (
    <>
      <TopBar />

      <header className="sticky top-0 z-50 border-b border-black/15 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6">

          {/* Logo */}

          <div className="flex justify-center border-b border-black/40 py-4 sm:py-6">

            <Link to="/" className="select-none">

              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">

                <span className="text-slate-900">
                  khabar
                </span>

                <span className="text-red-600">
                  Setu
                </span>

              </h1>

              <p className="mt-1 text-center text-[10px] uppercase tracking-[0.25em] text-slate-500 sm:mt-2 sm:text-xs sm:tracking-[0.35em]">
                Trusted Community News
              </p>

            </Link>

          </div>

          {/* Navigation */}

          <div className="relative flex items-center justify-center py-3 sm:py-4">

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full text-slate-800 transition hover:bg-slate-100 lg:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <nav className="hidden lg:flex items-center gap-12">

              {navLinks.map((link) => (

                <Link
                  key={link.path}
                  to={link.path}
                  className={`group relative text-[15px] font-semibold uppercase tracking-wide transition-all duration-300 ${
                    location.pathname === link.path
                      ? "text-red-600"
                      : "text-slate-700 hover:text-red-600"
                  }`}
                >
                  {link.name}

                  <span
                    className={`absolute -bottom-4 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
                      location.pathname === link.path
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />

                </Link>

              ))}

            </nav>

            {/* Mobile Navigation */}

            {mobileMenuOpen && (
              <div className="absolute left-0 right-0 top-full border-b border-black/15 bg-white shadow-lg lg:hidden">
                <nav className="flex flex-col px-6 py-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`border-b border-black/10 py-4 text-sm font-semibold uppercase tracking-wide transition ${
                        location.pathname === link.path
                          ? "text-red-600"
                          : "text-slate-700 hover:text-red-600"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            )}

            {/* Right Side */}

            <div className="absolute right-0 top-1/2 -translate-y-1/2">

              {currentUser ? (

                <DropdownMenu>

                  <DropdownMenuTrigger
                    render={
                      currentUser.profilePhotoUrl ? (
                        <img
                          src={currentUser.profilePhotoUrl}
                          alt="profile"
                          className="h-10 w-10 cursor-pointer rounded-full border-2 border-black/20 object-cover transition hover:border-red-600 sm:h-11 sm:w-11"
                        />
                      ) : (
                        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-600 font-bold text-white transition hover:bg-red-700 sm:h-11 sm:w-11">
                          {currentUser.username?.charAt(0).toUpperCase()}
                        </div>
                      )
                    }
                  />

                  <DropdownMenuContent
                    align="end"
                    className="w-64 rounded-xl"
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>
                        <div className="flex flex-col">
                          <span className="text-base font-semibold">
                            {currentUser.username}
                          </span>

                          <span className="text-xs font-normal text-slate-500">
                            {currentUser.email}
                          </span>
                        </div>
                      </DropdownMenuLabel>

                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard")}
                      >
                        Dashboard
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          navigate("/dashboard?tab=profile")
                        }
                      >
                        Profile
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          navigate("/dashboard?tab=saved")
                        }
                      >
                        Saved Articles
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      variant="destructive"
                      onClick={async () => {
                        try {
                          const res = await fetch(
                            `${import.meta.env.VITE_API_URL}/api/auth/signout`,
                            {
                              method: "POST",
                              credentials: "include",
                            }
                          );

                          if (!res.ok) {
                            throw new Error("Logout failed");
                          }

                          dispatch(signOutSuccess());
                          navigate("/sign-in");
                        } catch (error) {
                          console.error("Logout error:", error);
                        }
                      }}
                    >
                      Logout
                    </DropdownMenuItem>

                  </DropdownMenuContent>

                </DropdownMenu>

              ) : (

                <Link to="/sign-in">
                  <Button
                    className="
                      h-10
                      rounded-full
                      bg-slate-900
                      px-4
                      font-semibold
                      tracking-wide
                      text-white
                      transition-all
                      duration-300
                      hover:bg-red-600
                      sm:h-11
                      sm:px-7
                      sm:text-base
                    "
                  >
                    Sign In
                  </Button>
                </Link>

              )}

            </div>

          </div>

        </div>

      </header>

    </>
  );
};

export default Header;
