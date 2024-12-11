"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container, Typography, Button, Paper, Box } from '@mui/material';

const BookingDetails: React.FC = () => {
    const router = useRouter();
    const { id } = useParams();  

    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
            if (!id) return;  

            try {
                const res = await fetch(`http://host.docker.internal:5000/api/bookings/${id}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch booking details');
                }
                const data = await res.json();
                setBooking(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchBooking();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    if (!booking) return <div>Booking not found</div>;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeString: string) => {
        if (!timeString) return 'Invalid Time'; 

        const [time, modifier] = timeString.split(" ");
        let [hours, minutes] = time.split(":");

        if (modifier === "PM" && parseInt(hours, 10) < 12) {
            hours = (parseInt(hours, 10) + 12).toString();
        }
        if (modifier === "AM" && parseInt(hours, 10) === 12) {
            hours = "00"; 
        }

        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));

        const hoursIn12 = date.getHours() % 12 || 12; 
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        const formattedMinutes = date.getMinutes().toString().padStart(2, '0'); 

        return `${hoursIn12}:${formattedMinutes} ${ampm}`;
    };

    return (
        <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Booking Details
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                <Box mb={2} width="100%" maxWidth="400px">
                    <Typography variant="body1" align="left" style={{ marginBottom: '0.5rem' }}>
                        <strong>Doctor:</strong> {booking.doctor_name}
                    </Typography>
                </Box>
                <Box mb={2} width="100%" maxWidth="400px">
                    <Typography variant="body1" align="left" style={{ marginBottom: '0.5rem' }}>
                        <strong>Service:</strong> {booking.service}
                    </Typography>
                </Box>
                <Box mb={2} width="100%" maxWidth="400px">
                    <Typography variant="body1" align="left" style={{ marginBottom: '0.5rem' }}>
                        <strong>Date:</strong> {formatDate(booking.date)}
                    </Typography>
                </Box>
                <Box mb={2} width="100%" maxWidth="400px">
                    <Typography variant="body1" align="left" style={{ marginBottom: '0.5rem' }}>
                        <strong>Time:</strong> {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push('/')}
                    style={{ marginTop: '1rem' }}
                >
                    Back to Homepage
                </Button>
            </Box>
        </Paper>
    );
};

export default BookingDetails;
