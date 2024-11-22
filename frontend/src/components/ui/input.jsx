import React from "react"
export function Input({ id, ...props }) {
    return (
        <input
            id={id}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            {...props}
        />
    );
}