import React from "react";

interface ButtonProps {
    title: string;
    click?: () => void;
    width?: string;
}

export function Button({
    title,
    click,
    width
}: ButtonProps) {

    return (
        <button onClick={click} style={{width:width||'auto'}}>{title}</button>
    )
}