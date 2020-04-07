import { shallowMount } from '@vue/test-utils';
import PopMessage from '@/components/PopMessage';
import { findFromWrapper } from '@/utils/test';

describe('Component - PopMessage', () => {
    it('应该存在一个默认插槽', () => {
        const wrapper = shallowMount(PopMessage, {
            slots: {
                default: '<div data-test="pop-desc"></div>'
            }
        });

        const popDefault = findFromWrapper(wrapper, 'pop-desc');

        expect(popDefault.length).toBe(1);
    });

    it('不传入placement时，默认有一个classname是pop-left', () => {
        const wrapper = shallowMount(PopMessage);
        const popMessage = findFromWrapper(wrapper, 'pop-message').at(0);
        expect(popMessage.classes('pop-left')).toBe(true);
    });

    it('placement为right时，存在一个classname为pop-right', () => {
        const wrapper = shallowMount(PopMessage, {
            propsData: { placement: 'right' }
        });
        const popMessage = findFromWrapper(wrapper, 'pop-message').at(0);
        expect(popMessage.classes('pop-right')).toBe(true);
    });

    it('使用maxWidth控制最长宽度', () => {
        const wrapper = shallowMount(PopMessage, {
            propsData: {
                maxWidth: 200
            }
        });
        const popMessage = findFromWrapper(wrapper, 'pop-message').at(0);
        const styles = popMessage.attributes('style') || '';

        expect(/max-width: ?200px;?/.test(styles || '')).toBeTruthy();
    });

    it('生成快照，确定结构', () => {
        const wrapper = shallowMount(PopMessage, {
            propsData: {
                placement: 'right',
                maxWidth: 200
            },
            slots: {
                default: '<div>Hello</div>'
            }
        });

        expect(wrapper).toMatchSnapshot();
    });
});
