import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import React from 'react';
import './Tabs.scss';
import {TextAreaWidget} from '../../../posts/TextAreaWidget';

export const TabsInput = (props) => {
    return (
        <Tabs>
            <TabList>
                <Tab>Post</Tab>
                <Tab className={'hide'}>Facebook</Tab>
                <Tab className={'hide'}>LinkedIn</Tab>
                <Tab className={'hide'}>Twitter</Tab>
                <Tab className={'hide'}>Instagram</Tab>
                <Tab className={'hide'}>Pinterest</Tab>
            </TabList>

            <TabPanel>
                <textarea
                    id={'message'}
                    value={props.message}
                    onChange={props.handleChange}
                    placeholder={'Start Typin...'}
                />
                <TextAreaWidget
                    onEmojiClick={props.onEmojiClick}
                    message={props.message.length}
                />
            </TabPanel>
            <TabPanel>
                <h2>Any content Facebook</h2>
            </TabPanel>
            <TabPanel>
                <h2>Any content LinkedIn</h2>
            </TabPanel>
            <TabPanel>
                <h2>Any content Twitter</h2>
            </TabPanel>
            <TabPanel>
                <h2>Any content Instagram</h2>
            </TabPanel>
            <TabPanel>
                <h2>Any content Pinterest</h2>
            </TabPanel>
        </Tabs>
    );
};
