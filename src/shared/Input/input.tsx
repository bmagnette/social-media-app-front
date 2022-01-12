import {Input} from 'antd';
import React from 'react';

export const InputField = (props) => {
    return (
        <Input
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
    );
};
