import React from 'react';
import Paper from '@mui/material/Paper';
import {
    Appointments,
    DayView,
    Scheduler,
} from '@devexpress/dx-react-scheduler-material-ui';
import {ViewState} from '@devexpress/dx-react-scheduler';

export const Drafts = () => {
    const currentDate = '2018-11-01';
    const schedulerData = [
        {
            startDate: '2018-11-01T09:45',
            endDate: '2018-11-01T11:00',
            title: 'Meeting',
        },
        {
            startDate: '2018-11-01T12:00',
            endDate: '2018-11-01T13:30',
            title: 'Go to a gym',
        },
    ];
    return (
        <>
            <p>Work in progress : Draft / Scheduled / Posted</p>
            <Paper>
                <Scheduler data={schedulerData}>
                    <ViewState currentDate={currentDate} />
                    <DayView startDayHour={0} endDayHour={24} />
                    <Appointments />
                </Scheduler>
            </Paper>{' '}
        </>
    );
};
