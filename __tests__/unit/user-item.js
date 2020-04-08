import { shallowMount } from '@vue/test-utils';
import UserItem from '@/components/UserItem';
import { findFromWrapper } from '@/utils/test';

const user = {
    id: 1,
    avatar: 'http://img5.imgtn.bdimg.com/it/u=1796620972,4019147327&fm=26&gp=0.jpg',
    name: 'willem',
    time: '2020-04-03',
    summary: 'This is summay'
};

describe('Component - User', () => {
    it('应该包含一个用户名，头像，日期和摘要', () => {
        const wrapper = shallowMount(UserItem, {
            propsData: {
                user,
                dateFormat: 'DD/MM/YYYY'
            }
        });

        expect(findFromWrapper(wrapper, 'username').at(0).text()).toBe(user.name);
        expect(findFromWrapper(wrapper, 'datetime').at(0).text()).toBe('03/04/2020');
        expect(findFromWrapper(wrapper, 'summary').at(0).text()).toBe(user.summary);
        expect(findFromWrapper(wrapper, 'avatar').at(0).attributes('src')).toBe(user.avatar);
    });

    it('不传入头像时，不显示头像', () => {
        const wrapper = shallowMount(UserItem, {
            propsData: {
                user: {
                    name: 'willem',
                    time: '2020-04-03',
                    summary: 'This is summay'
                }
            }
        });

        expect(findFromWrapper(wrapper, 'avatar').exists()).toBeFalsy();
    });

    it('设置userDateFormat为Function，自定义日期', () => {
        const wrapper = shallowMount(UserItem, {
            propsData: {
                user: {
                    name: 'willem',
                    time: '2020-04-03',
                    summary: 'This is summay'
                },
                dateFormat: (time) => time
            }
        });

        expect(findFromWrapper(wrapper, 'datetime').at(0).text()).toBe('2020-04-03');
    });
});
