'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { useRouter } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm"

export default function NewMenuItemPage() {
    const router = useRouter(); // Initialize useRouter
    const [redirectToItems, setRedirectToItems] = useState(false);
    const { loading, data } = useProfile();

    async function handleFormSubmit(ev, data) {
        ev.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            
            if (response.ok) {
                resolve();
            } else reject();
        });
        await toast.promise(savingPromise, {
            loading: 'Saving this tasty item',
            success: 'Saved!',
            error: 'Error',
        });

        setRedirectToItems(true);
    }

    if (redirectToItems) {
        router.push('/menu-items'); // Navigate to menu items
        return null; // Prevent rendering the component further
    }

    if (loading) {
        return 'Loading user info...';
    }

    if (!data.admin) {
        return 'Not an admin.';
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <div className="max-w-2xl mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <Left />
                    <span>Show all menu items</span>
                </Link>
            </div>
            <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
        </section>
    );
}
