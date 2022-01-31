import React from 'react';
import {connectSocial, errorsHandlers} from '../../services/services';
import './ConnectButtons.scss';

export const ConnectButtons = (props) => {
    const navigate = props.navigate;
    return (
        <div className={'connexion-wrapper'}>
            <button
                onClick={() =>
                    errorsHandlers(connectSocial('twitter'), navigate)
                }
                className={'twitter-button'}>
                Twitter
            </button>
            <button
                onClick={() =>
                    errorsHandlers(connectSocial('facebook'), navigate)
                }>
                Facebook
            </button>
            <button className={'disabled-button instagram-button'}>
                Instagram
            </button>
            <button className={'disabled-button pinterest-button'}>
                Pinterest
            </button>
            <button
                className={'linkedin-button'}
                onClick={() =>
                    errorsHandlers(connectSocial('linkedin'), navigate)
                }>
                LinkedIn
            </button>
        </div>
    );
};
