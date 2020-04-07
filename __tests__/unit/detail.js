import { shallowMount } from '@vue/test-utils';
import Detail from '@/components/Detail';
import { findFromWrapper } from '@/utils/test';

describe('Component - Detail', () => {
    it('应该存在一个title，并且值和传入的title一致', () => {
        const title = '用户名';
        const wrapper = shallowMount(Detail, {
            propsData: {
                title
            }
        });
        const titleWrapper = findFromWrapper(wrapper, 'detail-title').at(0);
        expect(titleWrapper.text()).toBe(title);
    });
});
