import {Button, Modal} from 'antd';
import React from 'react';
import './warning-modal.scss';

export const WarningModal = (props) => {
    return (
        <Modal
            className={'warning-modal-wrapper'}
            visible={props.visible}
            onOk={props.handleOk}
            centered
            onCancel={props.handleCancel}
            footer={[
                <Button key="back" onClick={props.handleCancel}>
                    Return
                </Button>,
                <Button
                    key="submit"
                    type={props.submitButtonType}
                    loading={props.isLoading}
                    onClick={props.handleOk}>
                    {props.actionLabel}
                </Button>,
            ]}>
            <>
                <p>{props.message}</p>
            </>
        </Modal>
    );
};
