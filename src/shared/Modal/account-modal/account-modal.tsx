import {Button, Modal} from 'antd';
import React from 'react';
import './account-modal.scss';
import {useOutletContext} from 'react-router';
import {IUser} from '../../../interface/IUser';
import {firstLetterCapitalize, formatPythonDate} from '../../tools/formatter';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LinkedIn from '../../../asset/images/linkedin.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Twitter from '../../../asset/images/twitter-icon.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Facebook from '../../../asset/images/facebook-icon.png';
import {connectSocial, errorsHandlers} from '../../../services/services';

const selectPicture = (socialMedia: string, base64Img = null) => {
    switch (socialMedia) {
        case 'LINKEDIN':
            return 'data:image/png;base64, ' + base64Img;
        case 'TWITTER':
            return Twitter;
        case 'FACEBOOK':
            return 'data:image/png;base64, ' + base64Img;
        case 'FACEBOOK_PAGE':
            return 'data:image/png;base64, ' + base64Img;
        case 'FACEBOOK_GROUP':
            return 'data:image/png;base64, ' + base64Img;
    }
};

const selectType = (socialMedia: string) => {
    switch (socialMedia) {
        case 'LINKEDIN':
            return LinkedIn;
        case 'TWITTER':
            return Twitter;
        case 'FACEBOOK':
            return Facebook;
        case 'FACEBOOK_PAGE':
            return Facebook;
        case 'FACEBOOK_GROUP':
            return Facebook;
    }
};

export const AccountModal = (props) => {
    const user = useOutletContext<IUser>();

    const data = props.data;
    const navigate = props.navigate;

    const futureExpired = new Date(data.updated_at *1000).getTime() + (data.expired_in *1000);
    const daysDiff = (futureExpired - new Date().getTime())/ (1000 * 3600 * 24);

    return (
        <Modal
            className={'warning-modal-wrapper'}
            visible={props.visible}
            centered
            onCancel={props.handleCancel}
            footer={<>
                <Button key="back" onClick={props.handleCancel}>
                    Return
                </Button>
                <Button type="primary" key="refresh" onClick={() => {
                    const socialType = data.social_type.split("_")[0].toLowerCase();
                    errorsHandlers(connectSocial(socialType), navigate)
                }}>
                    Synchronization Account
                </Button>
                {user?.user.user_type === "ADMIN" && <Button danger key="delete" onClick={() => props.deleteAccount(data.id)}>
                    Delete account
                </Button>}
            </>}>
            <>
                <div className={"flex-start"}>
                    <div className={'profile-img-wrapper'}>
                        <img
                            className={'personalize-img'}
                            src={selectPicture(
                                data.social_type,
                                data.profile_img,
                            )}
                            alt={data.social_type}
                        />
                        <img
                            className={'profil-type'}
                            src={selectType(data.social_type)}
                            alt={data.social_type}
                        />
                    </div>
                    <div className={"profile-title"}>
                        <h1>{data.name}</h1>
                        <h2>{firstLetterCapitalize(data.social_type.replace("_", " ").toLowerCase())}</h2>
                    </div>
                </div>
                <div className={"margin-top-25"}>
                    <ul>
                        <li>First synchronization : {formatPythonDate(data.created_at)}</li>
                        <li>Last synchronization : {formatPythonDate(data.updated_at)}</li>
                        <li>Token expiration in : {parseInt(String(daysDiff)) + " days"}</li>
                    </ul>
                </div>
            </>
        </Modal>
    );
};
