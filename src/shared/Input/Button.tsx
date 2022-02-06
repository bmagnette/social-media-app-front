import React from 'react';
import './Button.scss';
import {LoadingOutlined} from '@ant-design/icons';

export const Button = (props) => {
    const disabled = props.disabled ? props.disabled : false;
    const isLoading = props.isLoading ? props.isLoading : false;

    return (
        <button
            type="button"
            className={`${props.className}`}
            disabled={disabled}
            onClick={props.submit}>
            {isLoading && <LoadingOutlined />}
            {props.title}
        </button>
    );
};
