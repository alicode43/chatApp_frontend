'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation'; // Updated import for useRouter
import Cookies from 'js-cookie';
import ThemeToggle from '../../components/ThemeToggle'; // Make sure this path is correct

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(""); // State for status message
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); 

  const [showNotification, setShowNotification] = useState(false); // State for notification visibility
  const router = useRouter(); // Get the router instance

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission refresh
    setLoading(true);
    setStatus(""); // Reset status on new attempt
    setIsSuccess(false); // Reset success state

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus(result.message || "Login failed. Please check your credentials.");
        setIsSuccess(false);
      } else {
        setStatus("Login successful!");
        setIsSuccess(true);

        // Save token in cookies for future authenticated requests
        Cookies.set("accessToken", result.data.accessToken, { expires: 7, path: "/" });
        Cookies.set("refreshToken", result.data.refreshToken, { expires: 7, path: "/" });

        // Clear inputs on successful login
        setEmail("");
        setPassword("");

        // Redirect to the home page after a brief delay
        setTimeout(() => {
          router.push("/"); // Redirect to the landing page
        }, 2000);
      }

      setShowNotification(true); // Show notification on any response
    } catch (e) {
      setStatus("Network error. Please try again.");
      setIsSuccess(false);
      setShowNotification(true); // Show notification on error
    } finally {
      setLoading(false);
    }
  };

  const googleAuth = async () => {
    window.location.href = "https://near-to-you-backend.onrender.com/api/v1/users/auth/google";
  };

  const handleClose = () => {
    setShowNotification(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[100vh] relative bg-white text-black dark:bg-black dark:text-white">
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={isSuccess ? "success" : "error"} sx={{ width: '100%' }}>
          {status}
        </Alert>
      </Snackbar>      

      {/* Image section - hidden on screens smaller than lg */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-[#DFD3F2] h-full justify-center items-center">
        <Image width={600} height={450} src="/pick.png" alt="Placeholder" />
      </div>

      {/* Form section - full width on mobile, 50% width on larger screens */}
      <div className="w-full lg:w-1/2 h-full flex justify-center items-center">
        <div className="w-[90%] lg:w-auto">
          <div
            className="font-['Inter'] font-extrabold text-5xl text-center mb-16 dark:text-white"
          >
            Near2You
          </div>

          <form className="flex flex-col items-center gap-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="rounded-[12px] h-[45px] w-full lg:w-[29vw] border border-[#82858B] px-4 mb-4 focus:outline-none focus:border-black focus:border-2 dark:focus:bg-black dark:focus:text-white dark:bg-black dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="rounded-[12px] h-[45px] w-full lg:w-[29vw] border border-[#82858B] px-4 mb-4 focus:outline-none focus:border-black focus:border-2 dark:focus:bg-black dark:focus:text-white dark:bg-black dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {status && !isSuccess && (
              <p className={`text-center ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
                {status}
              </p>
            )}
            <button
              type="submit"
              className="rounded-[12px] font-['Inter'] h-[45px] w-full lg:w-[29vw] border border-[#82858B] text-white"
              style={{
                backgroundColor: 'var(--color-primary)',
                transition: 'transform 0.3s',
              }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="flex items-center justify-center text-center">
            <div className="w-1/2 border-t border-[#DFD3F2]"></div>
            <span className="mx-2 text-[#00160A] text-[16px] font-medium font-['Inter']">OR</span>
            <div className="w-1/2 border-t border-[#DFD3F2]"></div>
          </div>

          <div className="items-center justify-center flex gap-3 mt-4 mb-4">
  <button
    onClick={googleAuth}
    className="font-['Inter'] rounded-[12px] h-[45px] w-full lg:w-[14vw] text-black border border-[#82858B] bg-white px-4 mb-4 flex text-[12px] font-bold items-center justify-center gap-4 transition-transform transform hover:scale-105 hover:bg-[#000000] hover:text-white dark:bg-black dark:text-white dark:border-[#82858B]"
  >
    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
      <Image width={24} height={24} src="/google.svg" alt="Google logo" />
    </div>
    Google
  </button>
  <button
    className="rounded-[12px] h-[45px] w-full lg:w-[14vw] text-black border border-[#82858B] bg-white px-4 mb-4 flex text-[12px] font-bold items-center justify-center gap-1 transition-transform transform hover:scale-105 hover:bg-[#000000] hover:text-white dark:bg-black dark:text-white dark:border-[#82858B]"
  >
    <div className="font-['Inter'] w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
      <Image width={24} height={24} src="/facebook.svg" alt="Facebook logo" />
    </div>
    Facebook
  </button>
</div>


          <div className="text-center font-['Inter']">
            Create a new account?
            <Link href="/signup" className="underline hover:text-[#ffffff] font-['Inter']">
              Sign Up
            </Link>
          </div><div className="text-center font-['Inter']">
            Create a new account?
            <Link href="/forgotpass" className="underline hover:text-[#ffffff] font-['Inter']">
              forgotpass
            </Link>
          </div>

        </div>
      </div>
      <div className="absolute top-5 right-5 z-10">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Page;
