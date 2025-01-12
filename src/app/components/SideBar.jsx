'use client'

import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { HomeIcon,PlusIcon} from "@heroicons/react/24/outline";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const toastStyle = {
  position: 'fixed',
  top: '1rem',
  right: '1rem',
  zIndex: 9999,
  backgroundColor: '#333',
  color: '#fff',
  padding: '1rem',
  borderRadius: '0.5rem',
  boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.1)',
};
export const Sidebar = ({ users, onSelectUser, selectedUserId }) => {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // Add state for search query
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const addContact = async (e) => {
    
      e.preventDefault();
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.error("No access token found");
        return;
      }
      const contactName = e.target.contactId.value;
  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/messages/addContact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ contactName })
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const result = await response.json();
        if (result.statusCode === 200) {
          console.log(result.data);
          toast.success(result.data, { style: toastStyle });
          handleClose();
        }        
      } catch (e) {
         toast.error("Failed to add contact.", { style: toastStyle });
        console.error("Error adding  contact:", e.message);
      
      }
    };
  
    return (
  
  
      <div className="w-1/4  p-4 border-r border-gray-300 bg-white dark:bg-black text-black dark:text-white h-full overflow-y-auto sidebar">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Personal Messenger</h2>
          <div>
          <Button
            // onClick={() => (window.location.href = "/")}
            className="text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300 border-none"
          >
            <HomeIcon className="w-6 h-6" />
          </Button>
     
  
  
          <Button onClick={handleOpen}> <PlusIcon className="w-4 h-4 " /></Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create New Contact
            </Typography>
            <form onSubmit={addContact}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="chatName">
                  Chat Id
                </label>
                <input
                  type="text"
                  id="chatName"
                  name="contactId"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-black dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Contact Id"
                  // onChange={this.handleChange}
  
                />
              </div>
              <div className="flex items-center justify-between">
                <Button type="submit" variant="contained" color="primary">
                  Add Contact
                </Button>
                <Button onClick={handleClose} variant="outlined" color="secondary">
                  Cancel
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
  
          
  
  
          </div>
  
  
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg dark:bg-black dark:text-white dark:border-black"
        />
        <ul className="overflow-y-auto max-h-[calc(100vh-200px)]">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className={`flex items-center p-3 mb-2 bg-white rounded-lg cursor-pointer hover:bg-gray-100 dark:bg-black dark:text-white dark:hover:bg-gray-800 ${user.id === selectedUserId ? "bg-blue-50 dark:bg-blue-900" : ""}`}
              onClick={() => onSelectUser(user.id)}
            >
              <img
                src={user.avatar || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}
                alt={user.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex-1">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500 truncate dark:text-white">
                  {user.lastMessage || "Start a conversation"}
                </p>
              </div>
              <span className="text-xs text-gray-400 dark:text-white">
                {/* 1 min ago  
                time stamp 
               */}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };