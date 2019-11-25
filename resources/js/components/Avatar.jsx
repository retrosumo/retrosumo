import React from "react";
import classNames from "classnames";

export default ({ className, src }) => {
    const classes = classNames(
        className,
        `w-6 h-6 rounded-full border border-pink-600`
    );
    return <img src={src} className={classes} />;
};
