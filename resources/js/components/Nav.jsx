import React from "react";
import ScrollToTop from "react-scroll-up";
import { ArrowUp } from "react-feather";

export const Nav = ({ csrfToken }) => {
    return (
        <nav className="bg-white shadow px-8 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>Retrosumo</div>
                <form method="post" action="/logout">
                    <input type="hidden" name="_token" value={csrfToken} />
                    <button type="submit" className="font-semibold">
                        Logout
                    </button>
                </form>
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
