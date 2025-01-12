import React, { useState } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Billing from '@/app/(front end)/billing/page.jsx';


const EditProfileForm = () => {
    const [showBilling, setShowBilling] = useState(false); // State to toggle billing view

    // Function to toggle billing view
    const toggleBilling = () => {
        setShowBilling((prev) => !prev);
    };

    return (
        <section className="">
            <div className="w-[75vw] h-[38vw] rounded-3xl border-2 shadow-md">
                <div className="space-x-[4vw] pl-[3vw] pt-[1vw]">
                    {/* Main section links */}
                    <button
                        onClick={() => setShowBilling(false)} // Show Edit Profile
                        className={`text-lg text-black border-b-2 border-transparent transition-colors duration-200 ${!showBilling ? 'border-blue-500 text-blue-500' : ''}`}
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={toggleBilling} // Show Billing
                        className={`text-lg text-black border-b-2 border-transparent transition-colors duration-200 ${showBilling ? 'border-blue-500 text-blue-500' : ''}`}
                    >
                        Billing
                    </button>
                </div>

                <div className="w-[75vw] items-center border-[0.1vw] my-"></div>

                <div className="content">  
                    {showBilling ? (
                        // Billing content
                        <div>
                            <Billing/>
                        </div>
                    ) : (
                        // Edit Profile Form
                        <div className="flex">
                            {/* Profile Image Section */}
                            <div className="w-[15vw] h-[15vw]">
                                <div className="pt-[3vw] pl-[4vw]">
                                    <div className="w-[8vw] h-[8vw] relative">
                                        <img
                                            src="/robo.png"
                                            alt="Profile"
                                            className="rounded-full w-[8vw] h-[8vw] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                        />
                                        <ModeEditIcon
                                            className="absolute bottom-2 right-1 w-[2vw] h-[2vw] rounded-full bg-[#4921B9] text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Input Form Section */}
                            <section className="grid grid-cols-2 gap-x-[4vw] gap-y-[0.5vw] p-[2vw]">
                                {[
                                    { label: 'Name', type: 'text' },
                                    { label: 'Phone No.', type: 'tel' },
                                    { label: 'Email', type: 'email' },
                                    { label: 'Password', type: 'password' },
                                    { label: 'Categories', type: 'text' },
                                    { label: 'Sub-categories', type: 'text' },
                                    { label: 'Available', type: 'text' },
                                    { label: 'Location', type: 'text' },
                                    { label: 'Social Media Link', type: 'url' },
                                ].map((field) => (
                                    <div key={field.label}>
                                        <label className="block mb-1">{field.label}</label>
                                        <input
                                            type={field.type}
                                            className="border p-2 w-[25vw] rounded-lg focus:outline-none focus:border-[#4921B9] focus:ring-1 focus:ring-[#4921B9]"
                                        />
                                    </div>
                                ))}

                                <div>
                                    <label className="block mb-1">About</label>
                                    <textarea
                                        className="border p-2 rounded-lg w-full focus:outline-none focus:border-[#4921B9] focus:ring-1 focus:ring-[#4921B9]"
                                    />
                                </div>
                            </section>
                        </div>
                    )}

                    {/* Save Button */}
                    {!showBilling && (
                        <div className="flex w-[75vw] h-[3vw] mt-">
                            <button className="h-[vw] w-[10vw] rounded-lg text-white bg-[#4921B9] ml-[61vw]">
                                Save
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default EditProfileForm;
