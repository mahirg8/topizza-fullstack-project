'use client';
import { useState } from "react";
import EditableImage from "@/components/layout/EditableImage"

export default function UserForm({ user, onSave }) {

    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');

    return (
        <div className="flex gap-4">
            <div>
                <div className=" p-2 rounded-lg relative max-w-[120px]">
                    <EditableImage link={image} setLink={setImage} />
                </div>
            </div>
            <form className="grow" onSubmit={ev => onSave(ev, { name: userName, image, phone, streetAddress, postalCode, city })}>
                <label>Name</label>
                <input type="text" placeholder="Name" value={userName} onChange={ev => setUserName(ev.target.value)} />
                <label>Email</label>
                <input type="email" disabled={true} value={user.email} placeholder={'Email'} />
                <label>Phone</label>
                <input type="tel" placeholder="Phone number" value={phone} onChange={ev => setPhone(ev.target.value)} />
                <label>Address</label>
                <input type="text" placeholder="Street Address" value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)} />
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label>City</label>
                        <input style={{ 'margin': '0' }} type="text" placeholder="City" value={city} onChange={ev => setCity(ev.target.value)} />
                    </div>
                    <div>
                        <label>Zip Code</label>
                        <input style={{ 'margin': '0' }} type="text" placeholder="Zip code" value={postalCode} onChange={ev => setPostalCode(ev.target.value)} />
                    </div>
                </div>
                <div>
                    <label className="p-2 block border" htmlFor="adminCb" >
                        <input id="adminCb" type="checkbox" className="mr-2" />
                        <span>Admin</span>
                    </label>
                </div>
                <button className="mt-5" type="submit">Save</button>
            </form>
        </div>
    );
}