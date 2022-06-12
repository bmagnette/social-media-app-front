import 'emoji-mart/css/emoji-mart.css';
import {Picker} from 'emoji-mart';
import React, {useState} from 'react';
import './TextAreaWidget.scss';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Emoji from '../asset/images/smile.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import UnSplash from '../asset/images/unsplash_icon.png';
import {CloudUploadOutlined} from '@ant-design/icons';

export const TextAreaWidget = (props) => {
    const [emojiSelected, setEmojiSelected] = useState(false);

    const ChangeEmoji = () => {
        setEmojiSelected(!emojiSelected);
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
                        <Picker onClick={props.onEmojiClick} style={{position: 'absolute', top: '35px', left: '0px'}}
                                i18n={{
                                    search: 'Recherche',
                                    categories: {search: 'Résultats de recherche', recent: 'Récents'},
                                }}/>
                    </div>
                </div>
                <div className={'widget file-loader'}>
                    <input type="file" id="file" style={{display: 'none'}} multiple accept="image/*"
                           onChange={props.onChangeFile}/>
                    <label htmlFor="file">
                        <CloudUploadOutlined/>
                    </label>
                </div>
                <div className={'widget'}>
                    <img src={UnSplash} alt={'unsplash'} height={25}
                         width={25} onClick={props.onUnSplashClick}/>
                </div>
            </div>
            <div className={'widget'}>
                <div>{props.message + '/280'}</div>
            </div>
        </div>
    );
};
