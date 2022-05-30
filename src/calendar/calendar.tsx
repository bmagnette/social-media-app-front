import React, {ComponentType, useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

import {
    DeleteCalendarEvent,
    GetCategories,
    GetPostBatch,
} from '../services/services';
import {DropdownField} from '../shared/Input/Dropdown';
import './calendar.scss';
import {useNavigate} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import {
    Appointments,
    AppointmentTooltip,
    DateNavigator,
    DayView,
    DragDropProvider,
    MonthView,
    Scheduler,
    Resources,
    Toolbar,
    ViewSwitcher,
    WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import {
    EditingState,
    Resource,
    ResourceInstance,
    ViewState,
} from '@devexpress/dx-react-scheduler';
import {PopoverOrigin} from '@material-ui/core';
import {toast} from 'react-toastify';
import Popover from '@material-ui/core/Popover/Popover';
import {
    CloseOutlined,
    DeleteOutlined,
    FormOutlined,
} from '@ant-design/icons/lib';
import {formatDate} from '../shared/tools/formatter';
import {AccountCard} from '../shared/Account/AccountCard';
import {WarningModal} from '../shared/Modal/warning-modal/warning-modal';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [displayedPosts, setDisplayedPosts] = useState([]);

    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [dropdownValue, setDropdownValue] = useState();
    const [categories, setCategories] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [category, setCategory] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [post, setPost] = useState(null);

    const [dateCalendar, setDateCalendar] = useState(new Date());
    const navigate = useNavigate();

    async function loadEvents() {
        const newPosts = await GetPostBatch(navigate);

        setPosts(newPosts);
        setDisplayedPosts(newPosts);
    }

    async function loadCategories() {
        const categories = await GetCategories(navigate);
        setCategories(categories);

        const catego = categories.map((category: {label: string}) => {
            return category.label;
        });
        catego.push('Without a group');
        catego.push('All');
        const reverseList = catego.reverse();
        setDropdownValue(reverseList[0]);
        setDropdownOptions(reverseList);
    }

    useEffect(() => {
        loadEvents();
        loadCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

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
            const postedDate = post.isScheduled
                ? new Date(post.schedule_date * 1000)
                : new Date(post.created_at * 1000);

            const accounts = [];
            post.posts.map((batch) => {
                accounts.push(batch.account);
            });

            const summary =
                post?.posts.length === 0 ? '' : post?.posts[0].message;

            const event = {
                startDate: postedDate,
                endDate: new Date(postedDate.getTime() + 1000 * 10),
                title: summary,
                accounts: accounts,
                ownerId: post.category ? post.category.color : null,
                post: post,
                id: post.id,
            };

            res.push(event);
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
                toast.error("You can't delete an event in the past", {
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
        console.log('IN');
        if (added) {
            // const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            // setData([...data, { id: startingAddedId, ...added }]);
        }
        if (changed) {
            // setData(data.map(appointment => (
            //     changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
        }
        if (deleted !== undefined) {
            // setData(data.filter(appointment => appointment.id !== deleted));
        }
        // setIsAppointmentBeingCreated(false);
    }, []);

    // }, [setData, setIsAppointmentBeingCreated, data]);

    const allowDrag = ({}) => true;

    return (
        <>
            <DropdownField
                placeholder={'Select a category'}
                options={dropdownOptions}
                onChange={onDropdownChange}
                controlClassName={"medium-dropdown"}
                value={dropdownValue}
            />
            <Paper>
                <Scheduler data={contructEvents(displayedPosts)}>
                    <ViewState
                        currentDate={dateCalendar}
                        onCurrentDateChange={currentDateChange}
                    />
                    <EditingState onCommitChanges={onCommitChanges} />

                    <MonthView />
                    <WeekView />
                    <DayView />
                    <Toolbar />
                    <Appointments />
                    <Resources data={resources} />
                    <AppointmentTooltip layoutComponent={Layout} />
                    <DateNavigator />
                    <ViewSwitcher />
                    <DragDropProvider allowDrag={allowDrag} />
                </Scheduler>
            </Paper>
        </>
    );
};
