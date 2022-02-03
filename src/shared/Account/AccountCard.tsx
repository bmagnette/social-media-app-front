// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LinkedIn from '../../asset/images/linkedin.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Twitter from '../../asset/images/twitter-icon.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Facebook from '../../asset/images/facebook-icon.png';
import React from 'react';
import {CloseCircleFilled} from '@ant-design/icons';
import './AccountCard.scss';

export const AccountCard = (props) => {
    const isClickOnlist = props.clickOnList ? 'cursor' : '';
    const selectPicture = (socialMedia: string) => {
        switch (socialMedia) {
            case 'LINKEDIN':
                return LinkedIn;
            case 'TWITTER':
                return Twitter;
            case 'FACEBOOK':
                return Facebook;
        }
    };
    return (
        <div className="accounts-card-wrapper">
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
                                : null
                        }>
                        <img
                            src={selectPicture(account.social_type)}
                            alt={account.social_type}
                        />
                        <br />
                        {account.name}
                        {props.closeConnection ? (
                            <CloseCircleFilled
                                onClick={() =>
                                    props.closeConnection(account.id)
                                }
                            />
                        ) : (
                            ''
                        )}
                    </li>
                );
            })}
            {props.accounts.length === 0 ? (
                <div className="bull-info">
                    Connect an account to start posting content.
                </div>
            ) : (
                ''
            )}
        </div>
    );
};
