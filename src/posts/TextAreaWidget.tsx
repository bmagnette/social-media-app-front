import Picker from 'emoji-picker-react';
import React, {useState} from 'react';
import './TextAreaWidget.scss';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Emoji from '../asset/images/smile.png';
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
            <div className="left-widget">
                <div className={'widget'}>
                    <img
                        onClick={ChangeEmoji}
                        src={Emoji}
                        height={25}
                        width={25}
                        alt={'Emoji'}
                    />
                    <div
                        className={
                            emojiSelected ? 'widget-display' : 'widget-hide'
                        }>
                        <Picker onEmojiClick={props.onEmojiClick} />
                    </div>
                </div>
                <div className={'widget disabled-button'} onClick={showLoader}>
                    <CloudUploadOutlined />
                </div>
            </div>
            <div className={'widget'}>
                <div>{props.message + '/280'}</div>
            </div>
        </div>
    );
};
