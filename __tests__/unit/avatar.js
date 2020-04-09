import { shallowMount } from '@vue/test-utils';
import Avatar from '@/components/Avatar';
import { findFromWrapper } from '@/utils/test';

describe('Component - Avatar', () => {
    it('传入了avator时，显示图片', () => {
        const avatar = 'http://123.png';
        const title = 'Hello';
        const wrapper = shallowMount(Avatar, {
            propsData: {
                avatar,
                title
            }
        });
        const img = findFromWrapper(wrapper, 'avatar-img').at(0);
        expect(img.element.tagName).toBe('IMG');
        expect(img.attributes('src')).toBe(avatar);
        expect(img.attributes('title')).toBe(title);
    });

    it('未传入了avator时，title传入中文，默认使用第一个字', () => {
        const wrapper = shallowMount(Avatar, {
            propsData: {
                title: '韦双健'
            }
        });
        const text = findFromWrapper(wrapper, 'avatar-text').at(0);
        expect(text.text()).toBe('韦');
    });

    it('未传入了avator时，title传入英文，默认使用头两个单词的首字母', () => {
        const wrapper = shallowMount(Avatar, {
            propsData: {
                title: 'Willem\'s Company Test'
            }
        });
        const text = findFromWrapper(wrapper, 'avatar-text').at(0);
        expect(text.text()).toBe('WC');
    });
});
