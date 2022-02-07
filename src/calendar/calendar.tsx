import 'kalend/dist/styles/index.css'; // import styles
import React, {useEffect, useState} from 'react';
import {GetCategories, GetPostBatch} from '../services/services';
import {DropdownField} from '../shared/Input/Dropdown';
import './calendar.scss';
import {ModalAntd} from '../shared/Modal/modal-antd';
import {useNavigate} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import {
    Appointments,
    // DayView,
    // WeekView,
    MonthView,
    Scheduler,
} from '@devexpress/dx-react-scheduler-material-ui';
import {ViewState} from '@devexpress/dx-react-scheduler';
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

    // const onEventClick = (data: Event) => {
    //     setPost(data);
    //     setIsVisible(true);
    //     return '';
    // };

    const handleCancel = () => {
        setIsVisible(false);
    };

    const onDropdownChange = async (value) => {
        const category = categories.find(
            (category) => category.label === value.label,
        );

        if (value.label === 'Without a group') {
            setDisplayedPosts([]);
        } else if (value.label === 'All') {
            setDisplayedPosts(posts);
        } else {
            setCategory(category.id);
            const displayBatch = posts.filter((batch) => {
                return batch.category.id === category.id;
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
                endDate: new Date(postedDate.getTime() + 1000 * 60),
                title: summary,
                accounts: accounts,
                post: post,
                id: post.id,
            };

            res.push(event);
            return post;
        });
        return res;
    };

    return (
        <>
            <DropdownField
                placeholder={'Select a category'}
                options={dropdownOptions}
                onChange={onDropdownChange}
                value={dropdownValue}
            />
            <Paper>
                <Scheduler data={contructEvents(displayedPosts)}>
                    <ViewState currentDate={new Date()} />
                    <MonthView />
                    <Appointments />
                </Scheduler>
            </Paper>{' '}
            {post !== null ? (
                <ModalAntd
                    visible={isVisible}
                    data={post}
                    title={post?.summary}
                    isFooter={false}
                    handleCancel={handleCancel}
                />
            ) : (
                ''
            )}
        </>
    );
};
