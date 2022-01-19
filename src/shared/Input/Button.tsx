import React from 'react';
import './Button.scss';

export const Button = (props) => {
    const disabled = props.disabled ? props.disabled : false;
    return (
        <button
            type="button"
            className={props.className}
            disabled={disabled}
            onClick={props.submit}>
            {props.title}
        </button>
    );
};
