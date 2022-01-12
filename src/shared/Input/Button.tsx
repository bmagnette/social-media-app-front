import React from 'react';
import './Button.scss';

export const Button = (props) => {
    return (
        <button
            type="button"
            className={props.className}
            onClick={props.submit}>
            {props.title}
        </button>
    );
};
