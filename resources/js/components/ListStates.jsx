import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

export const Loader = () => (
    <div className="flex justify-center my-12">
        <PacmanLoader
            sizeUnit={"px"}
            size={20}
            color={"#D53F8C"}
            loading={true}
        />
    </div>
);

export const Empty = ({ children, text = "No data found." }) => (
    <div>
        {children}
        {!children && text}
    </div>
);

export const End = ({
    children,
    text = "You've reached the end of the list."
}) => (
    <div className="text-center text-gray-600 text-sm my-12">
        {children}
        {!children && text}
    </div>
);
