'use client'; // Add this line at the top

import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThemeToggle from '../../components/ThemeToggle'; // Make sure this path is correct

const page = () => {
    return (
        <section className="h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col">
            <div className="flex">
                <div className="h-screen w-[60vw] bg-[#DFD3F2] justify-center items-center flex">
                    <img src="/forgot.png" alt="" />
                </div>

                <div className="h-screen w-[40vw] flex items-center justify-center">
                    <div className="w-[35vw] text-center">
                        <h1 className="text-[3.5vw] leading-[4.2vw] font-bold pt-[6vw] pb-[2vw]">
                            Success
                        </h1>
                        <p className="pb-[2vw]">
                            Lorem ipsum dolor sit amet. Ipsum dolor sit amet consectetur
                            adipisicing elit. Nobis, iure! Ipsum dolor, sit amet consectetur
                            adipisicing elit. Pariatur autem, quasi saepe ab officiis
                            reprehenderit numquam corporis magni iste eius!
                        </p>

                        {/* Large Green Check Icon */}
                        <CheckCircleIcon
                            className="text-green-500"
                            style={{ fontSize: '5vw' }} // Adjust icon size
                        />

                        <div className="flex flex-col items-center justify-center mt-[4vw]">
                            <button
                                className="w-[10vw] h-[3.5vw] rounded-[0.5vw] text-white font-medium"
                                style={{ backgroundColor: "var(--color-primary)" }}
                            >
                                Close
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* Add Theme Toggle Button in the top-right corner */}
            <div className="absolute top-5 right-5 z-10">
                <ThemeToggle />
            </div>
        </section>
    );
};

export default page;
