'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";
import UserTabs from "@/components/layout/UserTabs"
import EditableImage from '@/components/layout/EditableImage'

export default function ProfilePage() {
    const session = useSession();
    console.log(session);
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setImage(data.image);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            })
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: userName, image, streetAddress, phone, postalCode, city }),
            })
            if (response.ok) resolve()
            else reject();
        });
        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile Saved!',
            error: 'Error!'
        })
    }

    if (status === 'loading' || !profileFetched) {
        return 'Loading...';
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }



    return (
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin} />
            <h1 className="text-center text-primary text-4xl mb-4 mt-8">Profile</h1>
            <div className="max-w-2xl mx-auto">

                <div className="flex gap-4">
                    <div>
                        <div className=" p-2 rounded-lg relative max-w-[120px]">
                            <EditableImage link={image} setLink={setImage} />
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <label>Name</label>
                        <input type="text" placeholder="Name" value={userName} onChange={ev => setUserName(ev.target.value)} />
                        <label>Email</label>
                        <input type="email" disabled={true} value={session.data.user.email} placeholder={'Email'} />
                        <label>Phone</label>
                        <input type="tel" placeholder="Phone number" value={phone} onChange={ev => setPhone(ev.target.value)} />
                        <label>Address</label>
                        <input type="text" placeholder="Street Address" value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)} />
                        <div className="flex gap-2">
                            <div>
                                <label>City</label>
                                <input style={{ 'margin': '0' }} type="text" placeholder="City" value={city} onChange={ev => setCity(ev.target.value)} />
                            </div>
                            <div>
                                <label>Zip Code</label>
                                <input style={{ 'margin': '0' }} type="text" placeholder="Zip code" value={postalCode} onChange={ev => setPostalCode(ev.target.value)} />
                            </div>
                        </div>
                        <button className="mt-5" type="submit">Save</button>
                    </form>
                </div>
            </div>
        </section>
    );
}