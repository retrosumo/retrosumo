import React from "react";
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter } from "react-router-dom";

import Router from "./Router";
import { Nav, ScrollButton } from "./components/Nav";
import Toast from "./components/Toast";

import { UserProvider } from "./contexts/User";

const App = ({ csrfToken, userId }) => {
    return (
        <BrowserRouter>
            <UserProvider value={{ id: userId }}>
                <ToastProvider
                    autoDismissTimeout={2000}
                    placement="top-center"
                    components={{ Toast }}
                >
                    <Nav csrfToken={csrfToken} />

                    <Router />

                    <ScrollButton />
                </ToastProvider>
            </UserProvider>
        </BrowserRouter>
    );
};

export default App;
