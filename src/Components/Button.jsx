import React from "react";

export default function Button(props) {
    return (
        <button 
            className={`${props.name} ${props.isActive ? "active" : ""}`}
            onClick={props.onClick}
        >
            {props.label}
        </button>
        )
}