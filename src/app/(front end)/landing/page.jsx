'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Container, Typography, Box, Paper } from '@mui/material'
import Cookies from 'js-cookie'

export default function LandingPage() {
  const router = useRouter()

  const [senderId, setSenderId] = useState("");
  const [loading, setLoading] = useState(true); // Add this line

  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/get-user-profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const result = await response.json();
        if (result.success) {
          const id = result.data._id;
          setSenderId(id);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Failed to fetch user profile.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChatRedirect = () => {
    router.push('/chat')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Container maxWidth="lg">
        <div className="flex flex-col items-center justify-center min-h-screen py-12 space-y-8">
          <Paper elevation={3} className="p-8 rounded-xl bg-white/80 backdrop-blur-sm">
            <div className="text-center space-y-6">
              <Typography variant="h2" component="h1" className="text-4xl font-bold text-gray-900">
                Welcome to Our Platform
              </Typography>
              
              {senderId? (
                <Typography variant="h5" className="text-gray-600">
                  Your ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{senderId}</span>
                </Typography>
              ) : (
                <Typography variant="h5" className="text-gray-600">
                  Please log in to see your ID.
                </Typography>
              )}

              <Button variant="contained" color="primary" onClick={handleChatRedirect}>
                Go to Chat
              </Button>
            </div>
          </Paper>
        </div>
      </Container>
    </div>
  )
}