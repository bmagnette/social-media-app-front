import {Button, Modal} from 'antd';
import React from 'react';
import {formatDate} from '../tools/formatter';
import {AccountCard} from '../Account/AccountCard';
import './modal.antd.scss';
import {v4 as uuidv4} from 'uuid';

export const ModalAntd = (props) => {
    return (
        <Modal
            visible={props.visible}
            title={
                props?.data?.post?.category?.label
                    ? '[' +
                      props?.data?.post?.category?.label +
                      '] - ' +
                      formatDate(props?.data?.startAt)
                    : formatDate(props?.data?.startAt)
            }
            onOk={props.handleOk}
            onCancel={props.handleCancel}
            footer={
                props.isFooter
                    ? [
                          <Button key="back" onClick={props.handleCancel}>
                              Return
                          </Button>,
                          <Button
                              key="submit"
                              type="primary"
                              loading={props.isLoading}
                              onClick={props.handleOk}>
                              {props.isEditable ? 'Modify' : 'Create'}
                          </Button>,
                      ]
                    : ''
            }>
            <>
                {props.data && (
                    <AccountCard
                        key={uuidv4()}
                        accounts={props.data.accounts}
                    />
                )}
                <p>Posted : {'"' + props.title + '"'}</p>
            </>
        </Modal>
    );
};
