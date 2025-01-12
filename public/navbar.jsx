"use client"; // Directive for Next.js

import React, { useState } from "react";
import Link from "next/link";
import {
  AccountCircleRounded as AccountIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const NavLink = ({ item }) => (
  <li>
    <Link href="#" className="hover:underline text-white">
      {item}
    </Link>
  </li>
);

const UserDropdown = ({ isOpen, toggleDropdown }) => (
  <div className="relative">
    <button onClick={toggleDropdown} className="focus:outline-none" aria-label="User Menu">
      <img src="/robo.png" alt="Account Icon" className="rounded-full w-12 h-12 border-2 border-white" />
    </button>
    {isOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900">Ainsh</span>
          <span className="block text-sm text-gray-500">anishy398@gmail.com</span>
        </div>
        <ul className="py-2 text-black">
          {["Profile", "Sign out"].map((option) => (
            <li key={option}>
              <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                {option}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="w-full h-24 flex justify-center items-center bg-black">
      <nav className="w-[90vw] flex justify-between items-center px-8 text-white relative">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          <AccountIcon className="w-12 h-12 text-white" />
          <span className="ml-4 text-2xl font-semibold text-white">Near2you</span>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <CloseIcon className="w-6 h-6 text-white" /> : <MenuIcon className="w-6 h-6 text-white" />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`${isMenuOpen ? "block" : "hidden"
            } absolute top-24 left-0 right-0 bg-black md:hidden shadow-lg p-4 z-50`}
        >
          <ul className="space-y-4">
            {["Home", "Service", "Use Case", "Native"].map((item) => (
              <NavLink key={item} item={item} />
            ))}
          </ul>
          <div className="flex justify-between mt-4 items-center">
            {/* Search Bar for Mobile */}
            <div className="relative w-3/4">
              <input
                type="text"
                placeholder="Search here"
                className="w-full h-10 border-2 border-white px-4 rounded-xl text-black focus:outline-none"
                aria-label="Search"
              />
              <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-white" />
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          {["Home", "Service", "Use Case", "Native"].map((item) => (
            <NavLink key={item} item={item} />
          ))}
        </ul>

        {/* Search Bar for Desktop */}
        <div className="relative hidden md:block w-80">
          <input
            type="text"
            placeholder="Search here"
            className="w-full h-10 border-2 border-white px-4 rounded-xl text-black focus:outline-none"
            aria-label="Search"
          />
          <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-white" />
        </div>

        {/* User Dropdown */}
        <UserDropdown isOpen={isDropdownOpen} toggleDropdown={toggleDropdown} />
      </nav>
    </header>
  );
};

export default Navbar;
