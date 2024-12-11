"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const BookingList: React.FC = () => {
    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch('/api/bookings');
                if (!res.ok) {
                    throw new Error('Failed to fetch bookings');
                }
                const data = await res.json();
                setBookings(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div>
            <h1>All Bookings</h1>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.id}>
                        <Link href={`/booking/${booking.id}`}>
                            A Booking on {booking.date} starting at {booking.start_time}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingList;
