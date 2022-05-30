import React, {ComponentType, useState} from 'react';
import {AppointmentTooltip} from '@devexpress/dx-react-scheduler-material-ui';
import Popover, {PopoverOrigin} from '@material-ui/core/Popover/Popover';
import {CloseOutlined, DeleteOutlined, FormOutlined} from '@ant-design/icons/lib';
import {formatDate} from '../../shared/tools/formatter';
import {AccountCard} from '../../shared/Account/AccountCard';
import {v4 as uuidv4} from 'uuid';
import {WarningModal} from '../../shared/Modal/warning-modal/warning-modal';
import {DeleteCalendarEvent} from '../../services/services';
import {useNavigate} from 'react-router';
import {toast} from 'react-toastify';

const verticalTopHorizontalCenterOptions: PopoverOrigin = {
    vertical: 'center',
    horizontal: 'center',
};

export const Layout: ComponentType<AppointmentTooltip.LayoutProps> = ({
    appointmentMeta,
    visible,
    onHide,
    ...restProps
}) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        setIsLoading(true);
        await DeleteCalendarEvent(navigate, appointmentMeta?.data.id).then(res => {
            setIsLoading(false);
            setIsDeleting(false);
            onHide();
        })
    };
    const onDelete = () => {
        if(appointmentMeta?.data.startDate < new Date()){
            toast.error('You can\'t delete an event in the past', {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        } else{
            setIsDeleting(true);
        }
    };

    return (
        <Popover
            open={visible}
            onClose={onHide}
            anchorOrigin={verticalTopHorizontalCenterOptions}
            transformOrigin={verticalTopHorizontalCenterOptions}
            {...restProps}>
            <div className={'calendar-event-wrapper'}>
                <div className={'calendar-event-tools'}>
                    <FormOutlined onClick={onHide} />
                    <DeleteOutlined onClick={onDelete} />
                    {/*<EllipsisOutlined onClick={onHide} />*/}
                    <CloseOutlined onClick={onHide} />
                </div>
                <hr />
                <div className={'calendar-event-header'}>
                    {appointmentMeta?.data.title}
                </div>
                <div className={'calendar-event-time'}>
                    {formatDate(appointmentMeta?.data.endDate)}
                </div>
                <AccountCard
                    key={uuidv4()}
                    accounts={appointmentMeta?.data.accounts}
                    className={'no-context-style'}
                />

                <div className={'calendar-event-media'}></div>
                <WarningModal
                    visible={isDeleting}
                    handleOk={handleSubmit}
                    handleCancel={() => {
                        setIsDeleting(false);
                        setIsLoading(false);
                    }}
                    submitButtonType={'danger'}
                    isLoading={isLoading}
                    actionLabel={'Delete'}
                    message={'Do you want to delete this event ?'}
                />
            </div>
        </Popover>
    );
};
