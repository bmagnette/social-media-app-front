import Picker from 'emoji-picker-react';
import React, {useState} from 'react';
import './TextAreaWidget.scss';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Emoji} from '../asset/images/emoticone.png';
import {CloudUploadOutlined} from '@ant-design/icons';

export const TextAreaWidget = (props) => {
    const [emojiSelected, setEmojiSelected] = useState(false);

    const ChangeEmoji = () => {
        setEmojiSelected(!emojiSelected);
    };

    const showLoader = () => {
        console.log('LOADER');
    };

    return (
        <div className={'text-area-widget'}>
            <div className={'widget'} onClick={ChangeEmoji}>
                <img src={Emoji} height={40} width={40} alt={'Emoji'} />
                <div
                    className={
                        emojiSelected ? 'widget-display' : 'widget-hide'
                    }>
                    <Picker onEmojiClick={props.onEmojiClick} />
                </div>
            </div>
            <div className={'widget'} onClick={showLoader}>
                <CloudUploadOutlined />
            </div>
        </div>
    );
};
