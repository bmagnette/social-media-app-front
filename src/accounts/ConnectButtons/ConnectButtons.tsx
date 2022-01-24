import React from 'react';
import {
    ConnectLinkedIn,
    ConnectTwitterAccount,
    errorsHandlers,
} from '../../services/services';
import './ConnectButtons.scss';

export const ConnectButtons = (props) => {
    const navigate = props.navigate;
    return (
        <div className={'connexion-wrapper'}>
            <button
                onClick={() =>
                    errorsHandlers(ConnectTwitterAccount(), navigate)
                }
                className={'twitter-button'}>
                Twitter
            </button>
            <button className={'disabled-button facebook-button'}>
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
                onClick={() => errorsHandlers(ConnectLinkedIn(), navigate)}>
                LinkedIn
            </button>
        </div>
    );
};
