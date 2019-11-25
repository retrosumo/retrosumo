import React, { useContext } from "react";
import ScrollToTop from "react-scroll-up";
import { Link, NavLink } from "react-router-dom";
import { ArrowUp } from "react-feather";

import UserContext from "../contexts/User";
import Avatar from "../components/Avatar";

export const Nav = ({ csrfToken }) => {
    const { user } = useContext(UserContext);

    const hasAvatar = user.avatar_url !== null;

    return (
        <nav className="bg-white shadow px-8 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/">Retrosumo</Link>
                {user && (
                    <form
                        method="post"
                        action="/logout"
                        className="flex -mx-4 text-gray-800"
                    >
                        <input type="hidden" name="_token" value={csrfToken} />
                        <NavLink
                            to="/profile"
                            className="mx-4 flex items-center"
                            activeClassName="text-pink-600 font-semibold"
                        >
                            {hasAvatar && <Avatar src={user.avatar_url} className="mr-2" />}
                            {user.name}
                        </NavLink>
                        <button type="submit" className="mx-4">
                            Logout
                        </button>
                    </form>
                )}
                {!user && (
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
