import Kalend, {CalendarView} from 'kalend';
import 'kalend/dist/styles/index.css'; // import styles
import React from 'react';
import {Button} from '../shared/Input/Button';

export const Calendar = () => {
    const onEventClick = () => {
        return '';
    };

    const onNewEventClick = () => {
        return '';
    };

    const onSelectView = () => {
        return '';
    };

    // const selectedView = () => {
    //     return '';
    // };

    const onPageChange = () => {
        return '';
    };
    return (
        <>
            <Button
                title={'Add an event'}
                className={'big-square-blue'}
                submit={''}
            />
            <Kalend
                onEventClick={onEventClick}
                onNewEventClick={onNewEventClick}
                events={[]}
                initialDate={new Date().toISOString()}
                hourHeight={60}
                initialView={CalendarView.WEEK}
                disabledViews={[CalendarView.DAY]}
                onSelectView={onSelectView}
                onPageChange={onPageChange}
                timeFormat={'24'}
                weekDayStart={'Monday'}
                calendarIDsHidden={['work']}
                language={'en'}
            />
        </>
    );
};
