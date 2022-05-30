import './color-picker.scss';
import React from 'react';

export const ColorPicker = (props) => {
    return (
        <div className={'color-picker-wrapper'}>
            {props.colors.map((color) => {
                return (
                    <div
                        onClick={() => props.selectColor(color)}
                        style={{
                            cursor: 'pointer',
                            opacity: '0.2',
                            borderRadius: '50px',
                            margin: '5px',
                            backgroundColor: color,
                            height: '40px',
                            width: '40px',
                        }}
                        className={`${color === props.color && 'color-box-focus'} color-box`}
                    />
                );
            })}
        </div>
    );
};
