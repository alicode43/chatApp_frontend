'use client'; // Ensures the component runs on the client

import { useState } from 'react';
import axios from 'axios';

const ResetPasswordPage = ({ params }) => {
  const { token } = params; 
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;
