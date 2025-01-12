'use client';  // Mark this file as a Client Component

import React,{useState} from 'react';
import HelpIcon from '@mui/icons-material/Help';
import ThemeToggle from '../../../components/ThemeToggle'; // Make sure path is correct

const Page = ({ params }) => {
  const { token } = params; 
  // const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  // setPassword("147852369");
  const password="12365478963";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('token is ', token);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}//api/v1/users/resetPassword/${token}`, { password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };
  return (
    <section className="h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col">
      <div className="flex h-full"> {/* Ensure flex sections stretch */}
        {/* Left Section */}
        <div className="h-full w-[50vw] flex justify-center items-start py-[2vw]">
          <div className="w-[35vw]">
            <h1 className="text-[3.5vw] leading-[4.2vw] font-bold pt-[4vw] pb-[1vw]">
              Change password?
            </h1>
            <p className="pb-[3vw]">
              Lorem ipsum dolor sit amet. ipsum dolor sit amet consectetur adipisicing elit. Nobis,
              iure! ipsum dolor, sit amet consectetur adipisicing elit. Pariatur autem, quasi saepe
              ab officiis reprehenderit numquam corporis magni iste eius!
            </p>
            <form className="space-y-4">
              <div className="flex flex-col gap-[3vw]">
                {/* New Password Field */}
                <div>
                  <label
                    htmlFor="new-password"
                    className="mb-[0.5vw] font-medium text-[1.3vw] flex items-center justify-between"
                  >
                    <span>New Password</span>
                    <HelpIcon
                      className="text-gray-400 hover:text-blue-500 transition-colors duration-300 cursor-pointer ml-[0.3vw]"
                      fontSize="small"
                    />
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    name="new-password"
                    required
                    className="p-3 border rounded-[0.5vw] w-[35vw] focus:outline-none focus:ring-2 dark:bg-black dark:text-white"
                  />
                </div>
                {/* Confirm New Password Field */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-[0.5vw] font-medium text-[1.3vw] flex items-center justify-between"
                  >
                    <span>Confirm New password</span>
                    <HelpIcon
                      className="text-gray-400 hover:text-blue-500 transition-colors duration-300 cursor-pointer ml-[0.3vw]"
                      fontSize="small"
                    />
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    required
                    className="p-3 border rounded-[0.5vw] w-[35vw] focus:outline-none focus:ring-2 dark:bg-black dark:text-white"
                  />
                </div>
              </div>
            </form>
            {/* Buttons and Links */}
            <div className="flex flex-col items-center justify-center mt-[4vw]">
              <button
                className="w-[24.6vw] h-[3.5vw] rounded-[0.5vw] text-white font-medium"
                style={{ backgroundColor: 'var(--color-primary, #4CAF50)' }}
                onClick={handleSubmit}
              >
                Change password
              </button>
              <a
                href="#"
                className="pb-[1.5vw] pt-[1.5vw] text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
              >
                Do you need help?
              </a>

              <a
                href="#"
                className="text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
              >
                Customer support
              </a>

            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="h-full w-[50vw] bg-[#DFD3F2] flex justify-center items-center">
          <img src="/change.png" alt="Change Password Illustration" />
        </div>
      </div>

      {/* Add Theme Toggle Button in the top-right corner */}
      <div className="absolute top-5 right-5 z-10">
        <ThemeToggle />
      </div>
    </section>
  );
};

export default Page;
