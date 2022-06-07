import {Button, Modal} from 'antd';
import React from 'react';
import './event-modal.scss';

export const EventModal = (props) => {
    const data = props.data;
    console.log(props.data);
    return (
        <>
            {data && (<Modal
                className={'event-modal-wrapper'}
                visible={props.visible}
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
                        Modify
                    </Button>,
                ]}>
                <>
                    <h1>{data.title}</h1>
                    <p>{props.message}</p>
                </>
            </Modal>)}
        </>
    );
};
