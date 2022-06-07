import React, {ComponentType, useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {DeleteCalendarEvent, editEvent, GetCategories, GetPostBatch} from '../services/services';
import {DropdownField} from '../shared/Input/Dropdown';
import './calendar.scss';
import {useNavigate, useOutletContext} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import {
    AllDayPanel,
    Appointments,
    AppointmentTooltip,
    DateNavigator,
    DayView,
    DragDropProvider,
    EditRecurrenceMenu,
    MonthView,
    Resources,
    Scheduler,
    Toolbar,
    ViewSwitcher,
    WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import {EditingState, Resource, ViewState} from '@devexpress/dx-react-scheduler';
import {PopoverOrigin} from '@material-ui/core';
import {toast} from 'react-toastify';
import Popover from '@material-ui/core/Popover/Popover';
import {CloseOutlined, DeleteOutlined, FormOutlined} from '@ant-design/icons/lib';
import {formatDate, shortFormatDate} from '../shared/tools/formatter';
import {AccountCard} from '../shared/Account/AccountCard';
import {WarningModal} from '../shared/Modal/warning-modal/warning-modal';
import {IUser} from '../interface/IUser';
import {EventModal} from './event-modal/event-modal';
import Spinner from '../shared/spinner/Spinner';

const categoryId = [
    {
        id: 'Tomato',
        color: '#FF6347',
    },
    {
        id: 'Orange',
        color: '#FFA500',
    },
    {
        id: 'DodgerBlue',
        color: '#1E90FF',
    },
    {
        id: 'MediumSeaGreen',
        color: '#3CB371',
    },
    {
        id: 'Gray',
        color: '#808080',
    },
    {
        id: 'SlateBlue',
        color: '#6863D4',
    },
    {
        id: 'Violet',
        color: '#EE82EE',
    },
    {
        id: 'LightGray',
        color: '#D3D3D3',
    },
];

export const Calendar = () => {
    const [posts, setPosts] = useState([]);
    const [displayedPosts, setDisplayedPosts] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [dropdownValue, setDropdownValue] = useState();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const [dateCalendar, setDateCalendar] = useState(new Date());
    const [eventData, setEventData] = useState(null);
    const navigate = useNavigate();
    const user = useOutletContext<IUser>();

    async function loadEvents() {
        const newPosts = await GetPostBatch(navigate);

        // Display by default all events.
        setPosts(newPosts);
        setDisplayedPosts(newPosts);
    }

    async function loadCategories() {
        const categories = await GetCategories(navigate);
        setCategories(categories);

        const catego = categories.map((category: {label: string}) => {
            return category.label;
        });
        if (user.user.user_type == 'ADMIN') {
            catego.push('Without a group');
        }

        catego.push('All');
        const reverseList = catego.reverse();
        setDropdownValue(reverseList[0]);
        setDropdownOptions(reverseList);
    }

    useEffect(() => {
        if (user) {
            setIsLoading(true);
            loadEvents().then(r => {
                loadCategories();
                setIsLoading(false);
            });
        }
    }, [user]);

    const currentDateChange = (date) => {
        setDateCalendar(date);
    };

    const onDropdownChange = async (value) => {
        const category = categories.find(
            (category) => category.label === value.label,
        );

        if (value.label === 'Without a group') {
            const noCategory = posts.filter((batch) => {
                return batch.category === undefined;
            });
            setDisplayedPosts(noCategory);
        } else if (value.label === 'All') {
            setDisplayedPosts(posts);
        } else {
            setCategory(category.id);
            const displayBatch = posts.filter((batch) => {
                return batch?.category?.id === category.id;
            });

            setDisplayedPosts(displayBatch);
        }
        setDropdownValue(value.value);
    };
    const contructEvents = (posts) => {
        const res = [];
        posts.map((post) => {
            const accounts = [];
            post.posts.map((batch) => {
                accounts.push(batch.account);
            });

            if (post.event_type === 'DEFAULT') {
                let date = new Date(post.event_date * 1000);
                const test = {
                    startDate: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                    endDate: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
                    title: post.title,
                    allDay: post.is_all_day,
                    accounts: accounts,
                    ownerId: post.category ? post.category.color : null,
                    post: post,
                    id: post.id,
                };

                res.push(test);
                return post;
            }

            const postedDate = post.isScheduled
                ? new Date(post.schedule_date * 1000)
                : new Date(post.created_at * 1000);

            const categoryName = post.category?.label ? post.category?.label + ' - ' : '';
            const test = {
                startDate: postedDate,
                allDay: post.is_all_day,
                endDate: new Date(postedDate.getTime() + 1000 * 10),
                title: categoryName + (post?.posts.length === 0 ? '' : post?.posts[0].message),
                accounts: accounts,
                ownerId: post.category ? post.category.color : null,
                post: post,
                id: post.id,
            };

            res.push(test);
            return post;
        });
        return res;
    };

    const resources: Resource[] = [
        {
            fieldName: 'ownerId',
            instances: categoryId,
        },
    ];

    const verticalTopHorizontalCenterOptions: PopoverOrigin = {
        vertical: 'center',
        horizontal: 'center',
    };

    const Layout: ComponentType<AppointmentTooltip.LayoutProps> = ({
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
            await DeleteCalendarEvent(navigate, appointmentMeta?.data.id).then(
                (res) => {
                    setIsLoading(false);
                    setIsDeleting(false);
                    onHide();
                    loadEvents();
                },
            );
        };
        const onDelete = () => {
            if (appointmentMeta?.data.startDate < new Date()) {
                toast.error('You can\'t delete an event in the past', {
                    position: 'top-right',
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            } else {
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
                        <FormOutlined onClick={() => {
                            onHide();
                            setEventData(appointmentMeta?.data);
                            setIsVisible(true);
                        }}/>
                        <DeleteOutlined onClick={onDelete}/>
                        {/*<EllipsisOutlined onClick={onHide} />*/}
                        <CloseOutlined onClick={onHide}/>
                    </div>
                    <hr/>
                    <div className={'calendar-event-header'}>
                        {appointmentMeta?.data.title}
                    </div>
                    <div className={'calendar-event-time'}>
                        {appointmentMeta?.data.allDay ? shortFormatDate(appointmentMeta?.data.endDate) : formatDate(appointmentMeta?.data.endDate)}
                    </div>
                    {!appointmentMeta?.data.allDay && <AccountCard
                        key={uuidv4()}
                        noClick={true}
                        accounts={appointmentMeta?.data.accounts}
                        className={'no-context-style'}
                    />}

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

    const onCommitChanges = React.useCallback(({added, changed, deleted}) => {
        if (added) {
        }
        if (changed) {
            const _id = Object.keys(changed)[0];
            editEvent(_id, changed[_id]).then(r => {
                loadEvents();
            });
        }
        if (deleted !== undefined) {
        }
        // setIsAppointmentBeingCreated(false);
    }, []);

    return (
        <>
            <DropdownField
                placeholder={'Select a category'}
                options={dropdownOptions}
                onChange={onDropdownChange}
                controlClassName={'medium-dropdown'}
                value={dropdownValue}
            />
            {isLoading ? <Spinner/> : <>
                <Paper>
                    <Scheduler data={contructEvents(displayedPosts)} firstDayOfWeek={1}>
                        <ViewState
                            currentDate={dateCalendar}
                            onCurrentDateChange={currentDateChange}
                        />
                        <EditingState onCommitChanges={onCommitChanges}/>
                        <EditRecurrenceMenu/>

                        <MonthView/>
                        <WeekView/>
                        <DayView/>
                        <Toolbar/>
                        <AllDayPanel/>

                        <Appointments/>
                        <Resources data={resources}/>
                        <AppointmentTooltip layoutComponent={Layout}/>
                        <DateNavigator/>
                        <ViewSwitcher/>
                        <DragDropProvider allowDrag={({allDay}) => !allDay}
                                          allowResize={() => false}/>
                    </Scheduler>
                </Paper>
                <EventModal
                    data={eventData}
                    visible={isVisible}
                    handleCancel={() => {
                        setIsVisible(false);
                    }}
                    handleOk={() => {
                        console.log('in');
                    }}/>
            </>}


        </>
    );
};
