'use client';
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditUserPage(){

    const {loading, data} = useProfile();
    const [user, setUser] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        fetch('/api/users').then(res => {
            res.json().then(users => {
                const user = users.find(u => u._id === id);
                setUser(user);
            })
        })
    }, [])

    function handleSaveButtonClick(ev, data){
        ev.preventDefault();
        fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            
        })
    }

    if(loading){
        return 'Loading user profile...';
    }

    if(!data.admin){
        return 'Not an admin';
    }

    return(
        <section>
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <UserForm user={user} onSave={handleSaveButtonClick} />
            </div>
        </section>
    );
}