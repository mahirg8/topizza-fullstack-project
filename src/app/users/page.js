'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";

export default function UsersPage() {

    const [users, setUsers] = useState([]);
    const { loading, data } = useProfile();

    useEffect(() => {
        fetch('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users);
            })
        })
    }, [])

    if (loading) {
        return 'Loading user info...';
    }

    if (!data.admin) {
        return 'Not an admin';
    }

    return (
        <section className="max-w-2xl mx-auto  mt-8">
            <UserTabs isAdmin={true} />
            <div>
                {users?.length > 0 && users.map(user => (
                    <div className="bg-gray-300 rounded-lg mb-2 p-4 flex">
                        <div>
                            <span>{user.name}</span>
                            <span>{user.email}</span>
                        </div>
                        <div>
                            <button>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}