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
});
