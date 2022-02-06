import {Button, Modal} from 'antd';
import React from 'react';

export const ScheduleModal = (props) => {
    return (
        <Modal
            visible={props.visible}
            title={''}
            onOk={props.handleOk}
            onCancel={props.handleCancel}
            footer={
                <>
                    <Button key="back" onClick={props.handleCancel}>
                        Return
                    </Button>
                    <Button
                        key="submit"
                        type="primary"
                        loading={props.isLoading}
                        onClick={props.handleOk}>
                        {props.isEditable ? 'Modify' : 'Create'}
                    </Button>
                </>
            }
        />
    );
};
