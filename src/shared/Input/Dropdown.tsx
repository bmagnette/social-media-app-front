import Dropdown from 'react-dropdown';
import React from 'react';
import 'react-dropdown/style.css';
import './Dropdown.scss';

export const DropdownField = (props) => {
    return (
        <Dropdown
            className="medium-dropdown"
            controlClassName="medium-dropdown"
            placeholderClassName="myPlaceholderClassName"
            options={props.options}
            onChange={props.onChange}
            value={props.value}
            placeholder={props.placeholder}
        />
    );
};
