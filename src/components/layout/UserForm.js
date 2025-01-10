'use client';
import { useState } from "react";
import EditableImage from "@/components/layout/EditableImage"
import { useProfile } from "../UseProfile";
import AddressInputs from "./AddressInputs";

export default function UserForm({ user, onSave }) {

    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const {data: loggedInUserData} = useProfile();

    function handleAddressChange(propName, value){
        if(propName === 'phone') setPhone(value);
        if(propName === 'streetAddress') setStreetAddress(value);
        if(propName === 'city') setCity(value);
        if(propName === 'postalCode') setPostalCode(value);
    }

    return (
        <div className="md:flex gap-4">
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
                <AddressInputs addressProps={{phone, streetAddress, city, postalCode}} setAddressProps={handleAddressChange} />

                {loggedInUserData.admin && (
                <div>
                    <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb" >
                        <input id="adminCb" type="checkbox" className="" value={'1'} checked={admin} onClick={ev => setAdmin(ev.target.checked)} />
                        <span>Admin</span>
                    </label>
                </div>
                )}
                <button className="mt-5" type="submit">Save</button>
            </form>
        </div>
    );
}