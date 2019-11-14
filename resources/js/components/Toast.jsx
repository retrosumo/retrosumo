import React from "react";

export const Toast = ({ children }) => (
    <div className="bg-gray-800 text-white py-3 px-6 rounded shadow">{children}</div>
);

export default Toast;