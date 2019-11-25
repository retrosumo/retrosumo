import React from "react";
import classNames from "classnames";

export const Button = ({ disabled = false, text = "Submit" }) => {
    const buttonClassName = classNames(
        "bg-pink-600 text-white rounded py-2 px-3 font-semibold uppercase tracking-widest text-sm focus:outline-none focus:shadow-outline",
        {
            "hover:bg-pink-700": !disabled,
            "opacity-50 cursor-not-allowed": disabled
        }
    );

    return (
        <button type="submit" disabled={disabled} className={buttonClassName}>
            {text}
        </button>
    );
};

export default Button;
