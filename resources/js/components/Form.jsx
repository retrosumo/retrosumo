import React, { forwardRef } from "react";

export const TextareaField = forwardRef(
    ({ autoFocus, onChange, placeholder, rows = 3, value } = props, ref) => {
        const onValueChange = event => {
            const { value } = event.target;

            onChange(value);
        };

        return (
            <textarea
                ref={ref}
                value={value}
                onChange={onValueChange}
                className="w-full border px-3 py-2 rounded shadow-inner focus:outline-none focus:shadow-outline"
                placeholder={placeholder}
                rows={rows}
                autoFocus={autoFocus}
            />
        );
    }
);
