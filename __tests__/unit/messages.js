import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import Messages from '@/components/Messages';
import { findFromWrapper } from '@/utils/test';

const otherUser = {
    id: 1,
    avatar: 'http://img5.imgtn.bdimg.com/it/u=1796620972,4019147327&fm=26&gp=0.jpg',
    name: 'willem',
    time: '2020-04-03',
    summary: 'This is summay'
};

const messageList = [
    { id: 3, content: 'ccc', time: '2020-04-07 14:51:05', other: false },
    { id: 2, content: 'bbb', time: '2020-04-07 14:50:31', other: true },
    { id: 1, content: 'aaa', time: '2020-04-07 14:50:30', other: false }
];

describe('Component - Messages', () => {
    it('应该存在一个title，并且值和传入的otherUser中的name一致', () => {
        const wrapper = shallowMount(Messages, {
            propsData: {
                otherUser
            }
        });
        const titleWrapper = findFromWrapper(wrapper, 'messages-title').at(0);
        expect(titleWrapper.text()).toBe(otherUser.name);
    });

    it('当未选中一个用户时，显示一个暂无数据的图标', () => {
        const wrapper = shallowMount(Messages, {
            propsData: {
                otherUser: {}
            }
        });

        const nodata = findFromWrapper(wrapper, 'nodata');
        expect(nodata.length).toBe(1);
    });

    it('根据传入的messageDateFormat对列表进行分组，存在computed中的groupList', () => {
        const wrapper = shallowMount(Messages, {
            propsData: {
                messageDateFormat: 'YYYY-MM-DD HH:mm',
                list: messageList
            }
        });

        expect(wrapper.vm.groupList).toEqual([{
            time: '2020-04-07 14:50',
            list: [
                { id: 1, content: 'aaa', other: false, time: '2020-04-07 14:50:30' },
                { id: 2, content: 'bbb', other: true, time: '2020-04-07 14:50:31' }
            ]
        }, {
            time: '2020-04-07 14:51',
            list: [
                { id: 3, content: 'ccc', other: false, time: '2020-04-07 14:51:05' }
            ]
        }]);
    });

    it('当传入messageList时，应该存在两个group', () => {
        const wrapper = shallowMount(Messages, {
            propsData: {
                list: messageList,
                otherUser
            }
        });

        const groupList = findFromWrapper(wrapper, 'messages-group');

        expect(groupList.length).toBe(2);
    });

    it('当传入messageList时，第一个group存在2个item项并且日期为04/07/2020 14:50', () => {
        const wrapper = shallowMount(Messages, {
            propsData: {
                list: messageList,
                otherUser
            }
        });

        const firstGroup = findFromWrapper(wrapper, 'messages-group').at(0);
        const timeWrapper = findFromWrapper(firstGroup, 'messages-time').at(0);
        const itemsWrapper = findFromWrapper(firstGroup, 'messages-item');

        expect(timeWrapper.text()).toBe('04/07/2020 14:50');
        expect(itemsWrapper.length).toBe(2);
    });

    it('传入messageList，第1个item包含一个头像，并且包含一个classname为item-right', () => {
        // { id: 1, content: 'aaa', other: false, time: '2020-04-07 14:50:30' }
        const wrapper = shallowMount(Messages, {
            propsData: {
                list: messageList,
                otherUser
            }
        });

        const firstItem = findFromWrapper(wrapper, 'messages-item').at(0);
        const avatar = findFromWrapper(firstItem, 'messages-avatar');

        expect(avatar.exists()).toBeTruthy();
        expect(firstItem.classes('item-right')).toBeTruthy();
    });

    it('传入messageList，第2个item包含一个头像，并且包含一个classname为item-left', () => {
        // { id: 1, content: 'aaa', other: false, time: '2020-04-07 14:50:30' }
        const wrapper = shallowMount(Messages, {
            propsData: {
                list: messageList,
                otherUser
            }
        });

        const firstItem = findFromWrapper(wrapper, 'messages-item').at(1);
        const avatar = findFromWrapper(firstItem, 'messages-avatar');

        expect(avatar.exists()).toBeTruthy();
        expect(firstItem.classes('item-left')).toBeTruthy();
    });

    it('组件提供了slot-scope=messageItem来自定义消息', (done) => {
        // { id: 1, content: 'aaa', other: false, time: '2020-04-07 14:50:30' }
        const wrapper = shallowMount(Messages, {
            propsData: {
                list: messageList,
                otherUser
            },
            scopedSlots: {
                messageItem: '<div data-test="message-content" slot-scope="message">{{ message.id }}</div>'
            }
        });

        const messages = findFromWrapper(wrapper, 'message-content');

        Vue.nextTick(() => {
            expect(messages.at(0).text()).toBe('1');
            done();
        });
    });

    it('传入messageDateFormat来自定义日期显示', () => {
        const wrapper = shallowMount(Messages, {
            propsData: {
                list: messageList,
                otherUser,
                messageDateFormat: (time) => { return time; }
            }
        });

        const messageTime = findFromWrapper(wrapper, 'messages-time').at(0);
        expect(messageTime.text()).toBe('2020-04-07 14:50:30');
    });
});
