// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LinkedIn from '../../asset/images/linkedin.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Twitter from '../../asset/images/twitter-icon.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Facebook from '../../asset/images/facebook-icon.png';
import React, {useState} from 'react';
import './AccountCard.scss';
import {AccountModal} from '../Modal/account-modal/account-modal';

export const AccountCard = (props) => {

    const [isReadingAccount, setIsReadingAccount] = useState(false);
    const [readingAccount, setReadingAccount] = useState(null);

    const isClickOnlist = props.clickOnList ? 'cursor' : '';
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
    return (
        <div className={"accounts-card-wrapper " + props?.className}>
            {props.accounts.map((account) => {
                const isCursor =
                    props.clickOnList && !account?.isActive
                        ? 'transparent'
                        : '';

                const classList = isClickOnlist + ' ' + isCursor;
                return (
                    <li
                        key={account.id}
                        className={classList}
                        onClick={
                            props.clickOnList
                                ? () =>
                                      props.clickOnList(
                                          account.id,
                                          props.accounts,
                                          props.setAccounts,
                                      )
                                : () => {
                                    setIsReadingAccount(true);
                                    setReadingAccount(account);
                                }
                        }>
                        <div className={'profile-img-wrapper'}>
                            <img
                                className={'personalize-img'}
                                src={selectPicture(
                                    account.social_type,
                                    account.profile_img,
                                )}
                                alt={account.social_type}
                            />
                            <img
                                className={'profil-type'}
                                src={selectType(account.social_type)}
                                alt={account.social_type}
                            />
                        </div>
                        <div className={'profil-name'}>{account.name}</div>
                    </li>
                );
            })}
            {!props.isLoadingAccounts && props.accounts.length === 0 && (
                <div className="bull-info">
                    {!props.isLoadingAccounts ? 'Connect an account to start posting content.': ''}
                </div>
            )}
            {isReadingAccount && <AccountModal
                visible={isReadingAccount}
                data={readingAccount}
                handleOk={() => {
                    setIsReadingAccount(false);
                    setReadingAccount(null);
                }}
                deleteAccount={props.closeConnection}
                handleCancel={() => {
                    setIsReadingAccount(false);
                    setReadingAccount(null);
                }}
            />}

        </div>
    );
};
