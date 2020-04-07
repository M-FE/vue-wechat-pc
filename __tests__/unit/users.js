import { shallowMount } from '@vue/test-utils';
import Users from '@/components/UserList';
import { findFromWrapper } from '@/utils/test';
import Vue from 'vue';

const users = [{
    id: 1,
    avatar: 'http://img5.imgtn.bdimg.com/it/u=1796620972,4019147327&fm=26&gp=0.jpg',
    name: 'willem',
    time: '2020-04-03',
    summary: 'This is summay'
}, {
    id: 2,
    avatar: 'http://img5.imgtn.bdimg.com/it/u=1796620972,4019147327&fm=26&gp=0.jpg',
    name: 'wei',
    time: '2019-04-03',
    summary: 'This is summay123123'
}];

describe('Component - Users', () => {
    it('应该包含一个搜索框', () => {
        const wrapper = shallowMount(Users);
        const searchInput = findFromWrapper(wrapper, 'search');

        expect(searchInput.exists()).toBeTruthy();
    });

    it('搜索框的初始值应该为"", 搜索框的值应与keyword绑定', () => {
        const wrapper = shallowMount(Users);
        const changedKeyword = 'willem';
        const searchInput = findFromWrapper(wrapper, 'search').at(0);
        expect(searchInput.element.value).toBe('');

        searchInput.setValue(changedKeyword);
        expect(wrapper.vm.keyword).toBe(changedKeyword);
    });

    it('应该包含一个列表，列表的长度是用户的长度', () => {
        const wrapper = shallowMount(Users, {
            propsData: {
                users
            }
        });
        const items = findFromWrapper(wrapper, 'item');
        expect(items.length).toBe(users.length);
    });

    it('keyword的值改变后，页面上的列表项筛选后进行显示，默认对name进行筛选', (done) => {
        const wrapper = shallowMount(Users, {
            propsData: {
                users
            }
        });
        const keyword = 'wei';
        wrapper.setData({ keyword });

        Vue.nextTick(() => {
            /* 使用组件中的默认过滤的方法获取items的第一项 */
            const instanceItems = wrapper.vm.defaultFilter(keyword);
            const items = findFromWrapper(wrapper, 'item');

            expect(instanceItems.length).toBe(items.length);
            done();
        });
    });

    it('用户传入value时，默认选中id为value的项', () => {
        const wrapper = shallowMount(Users, {
            propsData: {
                users,
                value: 2
            }
        });

        const currentItem = findFromWrapper(wrapper, 'item').at(1);
        expect(currentItem.classes('selected')).toBeTruthy();
    });

    it('列表项点击之后会抛出一个input和change事件，参数是当前的user的id', () => {
        const wrapper = shallowMount(Users, {
            propsData: {
                users
            }
        });

        const index = 0;
        const item = findFromWrapper(wrapper, 'item').at(index);
        item.trigger('click');
        const userInput = wrapper.emitted()['input'][0];
        const userChange = wrapper.emitted()['change'][0];

        expect(userChange[0]).toEqual(users[index].id);
        expect(userInput[0]).toEqual(users[index].id);
    });
});
