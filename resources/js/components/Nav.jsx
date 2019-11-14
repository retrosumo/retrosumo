import React, { useContext } from "react";
import ScrollToTop from "react-scroll-up";
import { Link } from "react-router-dom";
import { ArrowUp } from "react-feather";

import UserContext from "../contexts/User";

export const Nav = ({ csrfToken }) => {
    const { id: userId } = useContext(UserContext);

    return (
        <nav className="bg-white shadow px-8 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/">Retrosumo</Link>
                {userId && (
                    <form method="post" action="/logout">
                        <input type="hidden" name="_token" value={csrfToken} />
                        <button type="submit" className="font-semibold">
                            Logout
                        </button>
                    </form>
                )}
                {!userId && (
                    <a href="/login" className="font-semibold">
                        Login
                    </a>
                )}
            </div>
        </nav>
    );
};

export const ScrollButton = () => (
    <ScrollToTop showUnder={160} style={{ bottom: 10, right: 20 }}>
        <div className="w-12 h-12 rounded-full shadow-md bg-pink-600 hover:bg-pink-700 text-white flex items-center justify-center">
            <ArrowUp />
        </div>
    </ScrollToTop>
);

export default Nav;
