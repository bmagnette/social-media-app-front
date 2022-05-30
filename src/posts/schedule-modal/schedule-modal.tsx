import {Button, Modal} from 'antd';
import React, {useState} from 'react';
import {DatePicker} from 'antd';
import moment from 'moment';
import {toast} from 'react-toastify';

export const ScheduleModal = (props) => {
    const disabledDate = (current) => {
        return current && current < moment().subtract(1, 'days');
    };

    const disabledDateTime = () => {
        return {};
    };

    const handleSubmit = () => {
        if (props.scheduleDate) {
            props.handleOk();
        } else {
            toast.error('Select a date', {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    return (
        <>
        <Modal
            visible={props.visible}
            onOk={handleSubmit}
            onCancel={props.handleCancel}
            footer={
                <>
                    <Button key="back" onClick={props.handleCancel}>
                        Return
                    </Button>
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleSubmit}>
                        Schedule
                    </Button>
                </>
            }>
            <h2>What time do you want us to post?</h2>
            <DatePicker
                format="YYYY-MM-DD HH:mm"
                disabledDate={disabledDate}
                disabledTime={disabledDateTime}
                onChange={(date) => props.setScheduleDate(date)}
                showTime={{defaultValue: moment('00:00', 'HH:mm')}}
            />
        </Modal>
            </>
    );
};
