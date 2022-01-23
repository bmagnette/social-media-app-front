import Kalend, {CalendarView} from 'kalend';
import 'kalend/dist/styles/index.css'; // import styles
import React, {useEffect, useState} from 'react';
import {GetCategories, GetPostBatch} from '../services/services';
import {DropdownField} from '../shared/Input/Dropdown';
import {Event} from './calendar.interfaces';
import './calendar.scss';
import {ModalAntd} from '../shared/Modal/modal-antd';

export const Calendar = () => {
    const [posts, setPosts] = useState([]);
    const [displayedPosts, setDisplayedPosts] = useState([]);

    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [dropdownValue, setDropdownValue] = useState();
    const [categories, setCategories] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [category, setCategory] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [post, setPost] = useState(null);

    async function loadEvents() {
        const newPosts = await GetPostBatch();
        setPosts(newPosts);
        setDisplayedPosts(newPosts);
    }

    async function loadCategories() {
        const categories = await GetCategories();
        setCategories(categories);

        const catego = categories.map((category: {label: string}) => {
            return category.label;
        });
        catego.push('Without categories');
        catego.push('All');
        const reverseList = catego.reverse();
        setDropdownValue(reverseList[0]);
        setDropdownOptions(reverseList);
    }

    useEffect(() => {
        loadEvents();
        loadCategories();
    }, []);

    const onEventClick = (data: Event) => {
        setPost(data);
        setIsVisible(true);
        return '';
    };

    function getFormattedDate(date) {
        const year = date.getFullYear();
        const month = (1 + date.getMonth()).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return day + '-' + month + '-' + year;
    }

    const handleCancel = () => {
        setIsVisible(false);
    };

    const onDropdownChange = async (value) => {
        const category = categories.find(
            (category) => category.label === value.label,
        );

        if (value.label === 'Without categories') {
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

    const constructEvents = (posts) => {
        const res = {};

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
                startAt: postedDate.toISOString(),
                endAt: postedDate.toISOString(),
                summary: summary,
                color: 'blue',
                accounts: accounts,
                post: post,
            };

            if (res.hasOwnProperty(getFormattedDate(postedDate))) {
                res[getFormattedDate(postedDate)].push(event);
            } else {
                res[getFormattedDate(postedDate)] = [event];
            }
            return post;
        });
        return res;
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
            <DropdownField
                placeholder={'Select a category'}
                options={dropdownOptions}
                onChange={onDropdownChange}
                value={dropdownValue}
            />
            <Kalend
                onEventClick={onEventClick}
                onNewEventClick={onNewEventClick}
                events={constructEvents(displayedPosts)}
                initialDate={new Date().toISOString()}
                hourHeight={35}
                initialView={CalendarView.WEEK}
                disabledViews={[CalendarView.DAY]}
                onSelectView={onSelectView}
                onPageChange={onPageChange}
                timeFormat={'24'}
                weekDayStart={'Monday'}
                calendarIDsHidden={['work']}
                language={'en'}
            />
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
