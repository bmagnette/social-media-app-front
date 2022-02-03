import React from 'react';
import {connectSocial, errorsHandlers} from '../../services/services';
import './ConnectButtons.scss';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Twitter from '../../asset/images/twitter-icon.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Facebook from '../../asset/images/facebook-icon.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LinkedIn from '../../asset/images/linkedin.png';
export const ConnectButtons = (props) => {
    const navigate = props.navigate;
    return (
        <div className={'connexion-wrapper'}>
            <button
                onClick={() =>
                    errorsHandlers(connectSocial('twitter'), navigate)
                }
                className={'twitter-button social-button'}>
                <img src={Twitter} width={25} height={25} alt={'Twitter'} />
                <span>Twitter</span>
            </button>
            <button
                onClick={() =>
                    errorsHandlers(connectSocial('facebook'), navigate)
                }
                className={'social-button facebook-button'}>
                <img src={Facebook} width={25} height={25} alt={'Facebook'} />
                <span>Facebook</span>
            </button>
            {/*<button*/}
            {/*    className={'disabled-button instagram-button social-button'}>*/}
            {/*    Instagram*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    className={'disabled-button pinterest-button social-button'}>*/}
            {/*    Pinterest*/}
            {/*</button>*/}
            <button
                className={'linkedin-button social-button'}
                onClick={() =>
                    errorsHandlers(connectSocial('linkedin'), navigate)
                }>
                <img src={LinkedIn} width={25} height={25} alt={'LinkedIn'} />
                <span>LinkedIn</span>
            </button>
        </div>
    );
};
