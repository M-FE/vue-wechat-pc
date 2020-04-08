import { shallowMount } from '@vue/test-utils';
import Wrapper from '@/components/Wrapper';
import { findFromWrapper } from '@/utils/test';

describe('Component - Wrapper', () => {
    it('应该存在一个用户列表和一个消息列表', () => {
        const wrapper = shallowMount(Wrapper);
        const userWrapper = findFromWrapper(wrapper, 'wrapper-users');
        const messageWrapper = findFromWrapper(wrapper, 'wrapper-messages');

        expect(userWrapper.length).toBe(1);
        expect(messageWrapper.length).toBe(1);
    });

    it('自定义userWidth：200px', () => {
        const wrapper = shallowMount(Wrapper, {
            propsData: {
                usersWidth: '200px'
            }
        });

        const userWrapper = findFromWrapper(wrapper, 'wrapper-users').at(0);

        expect(userWrapper.attributes('style')).toContain('width: 200px');
    });

    it('当前的userId默认为空', () => {
        const wrapper = shallowMount(Wrapper);
        expect(wrapper.vm.userId).toBe('');
    });

    it('触发userchange事件时，修改当前userId', () => {
        const wrapper = shallowMount(Wrapper);
        wrapper.vm.userChange(1);
        expect(wrapper.vm.userId).toBe(1);
    });

    it('传入的otherUser=1，userId也应该等于1', () => {
        const wrapper = shallowMount(Wrapper, {
            propsData: {
                otherUser: 1
            }
        });

        expect(wrapper.vm.userId).toBe(1);
    });
});
