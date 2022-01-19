import React from 'react';
import {connectLinkedIn, connectTwitterAccount} from '../../services/services';

export const ConnectButtons = () => {
    return (
        <div className={'connexion-wrapper'}>
            <button onClick={connectTwitterAccount}>Connect Twitter</button>
            <button className={'disabled-button'}>Connect Facebook</button>
            <button className={'disabled-button'}>Connect Instagram</button>
            <button className={'disabled-button'}>Connect Pinterest</button>
            <button onClick={connectLinkedIn}>Connect LinkedIn</button>
        </div>
    );
};
