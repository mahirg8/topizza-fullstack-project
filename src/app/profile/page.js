'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import UserTabs from "@/components/layout/UserTabs";
import UserForm from "@/components/layout/UserForm";

export default function ProfilePage() {
    const { data: session, status } = useSession(); // Properly access session and status

    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);

    useEffect(() => {
        if (status === 'authenticated' && session) {
            fetch('/api/profile')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch profile');
                    }
                    return response.json();
                })
                .then((data) => {
                    setUser(data);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
                .catch((error) => {
                    console.error('Error fetching profile:', error);
                });
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(ev, data) {
        ev.preventDefault();

        const savingPromise = fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile Saved!',
            error: 'Error saving profile!'
        });
    }

    if (status === 'loading' || !profileFetched) {
        return <div>Loading...</div>;
    }

    if (status === 'unauthenticated') {
        redirect('/login');
        return null; // Necessary to avoid further rendering
    }

    return (
        <section className="mt-8">
            <Toaster />
            <UserTabs isAdmin={isAdmin} />
            <h1 className="text-center text-primary text-4xl mb-4 mt-8">Profile</h1>
            <div className="max-w-2xl mx-auto">
                <UserForm user={user} onSave={handleProfileInfoUpdate} />
            </div>
        </section>
    );
}
