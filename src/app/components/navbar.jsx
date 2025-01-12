"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { AccountCircleRounded as AccountIcon, Search as SearchIcon, Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import io from 'socket.io-client';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NavLink = ({ item }) => (
  <li>
    <Link href="#" className="hover:underline text-white">
      {item}
    </Link>
  </li>
);

const UserDropdown = ({ isOpen, toggleDropdown, handleLogout, user }) => (
  <div className="relative">
    <button onClick={toggleDropdown} className="focus:outline-none" aria-label="User Menu">
      <img src="/robo.png" alt="Account Icon" className="rounded-full w-12 h-12" />
    </button>
    {isOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900">{user.name}</span>
          <span className="block text-sm text-gray-500">{user.email}</span>
        </div>
        <ul className="py-2 text-black">
          <li>
            <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
              Profile
            </Link>
          </li>
     
          <li>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
              Sign out
            </button>
          </li>
        </ul>
      </div>
    )}
  </div>
);

const Navbar = ({ showSearchInput }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };


  const handleLogout = () => {
    Cookies.remove('accessToken');
    setIsLoggedIn(false);
    setUser({ name: '', email: '' });
    setIsDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(prev => !prev);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = Cookies.get('accessToken');
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/get-user-profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        const result = await response.json();

        if (result.success) {
          setUser({
            name: result.data.name || 'Guest',
            email: result.data.email || 'No email provided'
          });
          setIsLoggedIn(true);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error('Failed to fetch user profile.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);
    socket.on('notification', (notification) => {
      setNotifications(prev => [...prev, notification]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return (
      <header className="w-full h-24 flex justify-center items-center bg-black">
        <nav className="w-[90vw] flex justify-between items-center px-8 text-white">
          <span>Loading...</span>
        </nav>
      </header>
    );
  }

  return (
    <header className="w-full h-24 flex justify-center items-center bg-black">
      <nav className="w-[90vw] flex justify-between items-center px-8 text-white">
        <div className="flex items-center">
          <AccountIcon className="w-12 h-12 text-white" />
          <span className="ml-4 text-2xl font-semibold">Personal Massenger</span>
        </div>
        {/* <ul className={`flex space-x-8 md:flex hidden`}>
          {["Home", "Service", "Use Case", "Native"].map((item) => (
            <NavLink key={item} item={item} />
          ))}
        </ul> */}

        {/* Hamburger menu for mobile */}
        <div className="md:hidden flex items-center space-x-6 z-60"> {/* Set higher z-index for hamburger */}
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <CloseIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
          </button>
        </div>


        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-24 left-0 right-0 bg-black text-white p-4 z-50`}>
 

        </div>
     
        
        {/* Desktop user login */}
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={toggleNotifications} className="relative">
            <NotificationsIcon className="w-8 h-8 text-white" />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {notifications.length}
              </span>
            )}
          </button>
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50">
              <ul className="py-2 text-black">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <li key={index} className="px-4 py-2 text-sm hover:bg-gray-100">
                      {notification.message}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-sm text-gray-500">No notifications</li>
                )}
              </ul>
            </div>
          )}
          {isLoggedIn ? (
            <>
              <span className="text-lg">Hello, {user.name}</span>
              <UserDropdown
                isOpen={isDropdownOpen}
                toggleDropdown={toggleDropdown}
                handleLogout={handleLogout}
                user={user}
              />
            </>
          ) : (
            <Link href="/signin">
              <button className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
