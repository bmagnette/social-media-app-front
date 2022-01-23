import React from 'react';
import {ConnectLinkedIn, ConnectTwitterAccount} from '../../services/services';

export const ConnectButtons = () => {
    return (
        <div className={'connexion-wrapper'}>
            <button onClick={ConnectTwitterAccount}>Connect Twitter</button>
            <button className={'disabled-button'}>Connect Facebook</button>
            <button className={'disabled-button'}>Connect Instagram</button>
            <button className={'disabled-button'}>Connect Pinterest</button>
            <button onClick={ConnectLinkedIn}>Connect LinkedIn</button>
        </div>
    );
};
