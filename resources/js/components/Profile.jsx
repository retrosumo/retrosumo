import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

import { Button } from "./Button";
import UserContext from "../contexts/User";

export const Profile = () => {
    const { user, updateUser } = useContext(UserContext);
    const [name, setName] = useState(user.name);
    const [avatar, setAvatar] = useState("");
    const [isValid, setIsValid] = useState(false);

    const { addToast } = useToasts();

    useEffect(() => {
        setIsValid(name.length > 0 && name !== user.name);
    }, [name, user]);

    const saveUser = async () => {
        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("avatar", avatar.file);

            const { data: updatedUser } = await axios.post(
                "/api/users",
                formData,
                { headers: { "Content-Type": "multipart/form-data;" } }
            );

            // Update context with `updatedUser`
            updateUser(updatedUser);

            const toastOptions = {
                appearance: "success",
                autoDismiss: true
            };

            addToast("Your profile was saved successfully.", toastOptions);
        } catch (err) {
            console.error(err);
        }
    };

    const submit = e => {
        e.preventDefault();

        saveUser();
    };

    const onSelectFile = e => {
        const { files } = e.target;

        if (files.length > 0) {
            const selectedFile = files[0];

            setAvatar({
                file: selectedFile
            });
        }
    };

    return (
        <div className="container mx-auto mt-4">
            <h2 className="text-2xl border-b border-pink-400 pb-2 mb-2">
                My Profile
            </h2>

            <form onSubmit={submit}>
                <label className="block my-4">
                    <div className="mb-1 text-gray-700 uppercase tracking-widest text-sm">
                        Name
                    </div>
                    <input
                        type="text"
                        className="w-full border shadow-inner rounded px-2 py-1 focus:outline-none focus:shadow-outline"
                        placeholder="Enter your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autoFocus
                    />
                </label>

                <label className="block my-4">
                    <div className="mb-1 text-gray-700 uppercase tracking-widest text-sm">
                        Avatar
                    </div>
                    <input type="file" onChange={onSelectFile} />
                </label>

                <Button disabled={!isValid} text="Save" />
            </form>
        </div>
    );
};

export default Profile;
