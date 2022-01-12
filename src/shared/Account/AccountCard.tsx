// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LinkedIn from '../../asset/images/linkedin.png';
import React from 'react';
import {CloseCircleFilled} from '@ant-design/icons';
import './AccountCard.scss';

export const AccountCard = (props) => {
    const isClickOnlist = props.clickOnList ? 'cursor' : '';
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
                        <img src={LinkedIn} alt={account.social_type} />
                        <br />
                        {account.first_name} {account.last_name}{' '}
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
                    There is no account for this category
                </div>
            ) : (
                ''
            )}
        </div>
    );
};
