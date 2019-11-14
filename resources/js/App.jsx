import React from "react";
import { ToastProvider } from "react-toast-notifications";

import { Nav, ScrollButton } from "./components/Nav";
import Post from "./components/Post";
import Toast from "./components/Toast";

import { UserProvider } from "./contexts/User";

const App = ({ csrfToken, userId }) => (
    <UserProvider value={{ id: userId }}>
        <ToastProvider
            autoDismissTimeout={2000}
            placement="top-center"
            components={{ Toast }}
        >
            <Nav csrfToken={csrfToken} />
            <div className="container mx-auto max-w-xl">
                <Post />
            </div>

            <ScrollButton />
        </ToastProvider>
    </UserProvider>
);

export default App;
