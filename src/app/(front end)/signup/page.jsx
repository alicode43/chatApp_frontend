"use client"; // Add this line at the top

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Snackbar, Alert } from '@mui/material';
import ThemeToggle from '../../components/ThemeToggle';

function Page() {
  const [formData, setFormData] = useState({
    role: 'user',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state for success message
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setFormData(prevData => ({ ...prevData, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, termsAccepted } = formData;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long!");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format! Email must contain '@' and a valid domain with '.'");
      return;
    }

    if (!termsAccepted) {
      setErrorMessage("You must accept the terms and conditions!");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}//api/v1/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
          email: formData.email,
          password,
          role: formData.role
        }),
      });

      if (response.status === 409) {
        setErrorMessage("User already exists!");
        return;
      }

      if (!response.ok) throw new Error('Registration failed. Please try again.');

      await response.json();
      setOpenSnackbar(true);
      setErrorMessage('');

      setFormData({
        role: 'user', // Reset to default role
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
      });
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[100vh] bg-white text-black dark:bg-black dark:text-white">
      {/* Merged image section */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-[#DFD3F2] h-full justify-center items-center">
        <Image width={600} height={450} src="/pick.png" alt="Placeholder" />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 h-full flex justify-center items-center">
        <div className="w-[90%] lg:w-auto">
          <div className="font-['Inter'] font-extrabold text-[var(--color-primary)] text-5xl text-center mb-5">
           Personal Messanger
          </div>

          <form className="gap-4" onSubmit={handleSubmit}>
            {/* Role Dropdown */}


            <div className=" flex flex-col lg:flex-row gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="rounded-[12px] h-[45px] w-full lg:w-[14vw] border border-[var(--color-border)] px-4 transition-colors duration-300 focus:border-[var(--color-primary)] focus:outline-none focus:border-black-500 focus:border-2 bg-white text-black dark:bg-black dark:text-white"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="rounded-[12px] h-[45px] w-full lg:w-[14vw] border border-[var(--color-border)] px-4 transition-colors duration-300 focus:border-[var(--color-primary)] focus:outline-none focus:border-black-500 focus:border-2 bg-white text-black dark:bg-black dark:text-white"
              />
            </div>
            <br />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-[12px] h-[45px] w-full lg:w-[29vw] border border-[var(--color-border)] px-4 mb-4 transition-colors duration-300 focus:border-[var(--color-primary)] focus:outline-none focus:border-black-500 focus:border-2 bg-white text-black dark:bg-black dark:text-white"
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="rounded-[12px] h-[45px] w-full lg:w-[29vw] border border-[var(--color-border)] px-4 mb-4 transition-colors duration-300 focus:border-[var(--color-primary)] focus:outline-none focus:border-black-500 focus:border-2 bg-white text-black dark:bg-black dark:text-white"
            />
            <br />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="rounded-[12px] h-[45px] w-full lg:w-[29vw] border border-[var(--color-border)] px-4 mb-4 transition-colors duration-300 focus:border-[var(--color-primary)] focus:outline-none focus:border-black-500 focus:border-2 bg-white text-black dark:bg-black dark:text-white"
            />
            <div className="text-left font-['Inter'] flex items-center mb-3">
              <input
                type="checkbox"
                name="termsAccepted"
                id="terms"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mr-2 w-6 h-6"
                required
              />
              <label htmlFor="terms" className="text-[var(--color-text)]">
                I agree to the
                <a href="#" className="underline hover:text-[var(--color-primary)]"> Terms & Conditions</a>
              </label>
            </div>
            <button
              type="submit"
              className="rounded-[12px] h-[45px] w-full lg:w-[29vw] border border-[var(--color-border)] text-white bg-[var(--color-primary)] px-4 mb-4 transition-transform transform hover:scale-105 hover:bg-[var(--color-hover-bg)] hover:text-black bg-white text-black dark:bg-black dark:text-white"
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center justify-center text-center">
            <div className="w-1/2 border-t border-[var(--color-bg)]"></div>
            <span className="mx-2 text-[var(--color-text)] text-[16px] font-medium font-['Inter']">OR</span>
            <div className="w-1/2 border-t border-[var(--color-bg)]"></div>
          </div>

          <div className="items-center justify-center flex gap-3 mt-4 mb-4">
            <button className="font-['Inter'] rounded-[12px] h-[45px] w-full lg:w-[14vw] text-black border border-[var(--color-border)] bg-white px-4 mb-4 flex text-[12px] font-bold items-center justify-center gap-4 transition-transform transform hover:scale-105 hover:bg-[var(--color-primary)] hover:text-white">
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                <img className="w-6 h-6 object-cover rounded-full" src="/google.svg" alt="Google logo" />
              </div>
              Google
            </button>
            <button className="rounded-[12px] h-[45px] w-full lg:w-[14vw] text-white border border-[var(--color-border)] bg-[var(--color-primary)] px-4 mb-4 flex text-[12px] font-bold items-center justify-center gap-1 transition-transform transform hover:scale-105 hover:bg-[var(--color-primary)] hover:text-white">
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                <img className="w-6 h-6 object-cover rounded-full" src="/facebook.svg" alt="Facebook logo" />
              </div>
              Facebook
            </button>
          </div>
          <div className="text-center">
            Already have an account?
            <Link href="/Signin">
              <button className="underline hover:text-[var(--color-primary)]"> Login</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Material UI Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          User created successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar for error messages */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={4000}
        onClose={() => setErrorMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setErrorMessage('')} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <div className="absolute top-5 right-5 z-10">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Page;
