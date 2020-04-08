import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Wrapper from '@/components/Wrapper';
import { findFromWrapper } from '@/utils/test';

const userList = [{
    id: 1,
    avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585943958566&di=38ae311becf29781df3313190e6e2f12&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D86853839%2C3576305254%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D750%26h%3D390',
    name: 'willem',
    time: '2020-04-03',
    summary: 'This is summay'
}, {
    id: 2,
    avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585943958566&di=38ae311becf29781df3313190e6e2f12&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D86853839%2C3576305254%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D750%26h%3D390',
    name: 'wei',
    time: '2019-04-03',
    summary: 'This is summay123123'
}];

const messageList = [
    { id: 3, content: 'ccc 123123 123123123    123123', time: '2020-04-07 14:51:05', other: false },
    { id: 2, content: 'bbb', time: '2020-04-07 14:50:31', other: true },
    { id: 1, content: 'aaa', time: '2020-04-07 14:50:30', other: false }
];

let wrapper;

beforeEach(() => {
    wrapper = mount(Wrapper, {
        propsData: {
            userList,
            messageList
        }
    });
});

describe('Integration - Wrapper', () => {
    it('页面上需要显示两个用户项', () => {
        const items = findFromWrapper(wrapper, 'item');

        expect(items.length).toBe(2);
    });

    it('初始时，右边默认显示nodata', () => {
        const nodata = findFromWrapper(wrapper, 'nodata');

        expect(nodata.exists()).toBeTruthy();
    });

    it('输入框输入willem时，用户列表只显示一个item', (done) => {
        const searchInput = findFromWrapper(wrapper, 'search').at(0);

        searchInput.element.value = 'willem';
        searchInput.trigger('input');
        Vue.nextTick(() => {
            const items = findFromWrapper(wrapper, 'item');
            expect(items.length).toBe(1);
            done();
        });
    });

    it('点击用户列表中的一项，消息列表的nodata会替换为消息列表', (done) => {
        const item = findFromWrapper(wrapper, 'item').at(0);
        item.trigger('click');

        Vue.nextTick(() => {
            const nodata = findFromWrapper(wrapper, 'nodata');
            const messageTitle = findFromWrapper(wrapper, 'messages-title').at(0);
            const messageItems = findFromWrapper(wrapper, 'messages-item');

            expect(nodata.exists()).toBeFalsy();
            expect(messageTitle.text()).toBe('willem');
            expect(messageItems.length).toBe(3);
            done();
        });
    });
});
