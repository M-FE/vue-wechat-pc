/**
 * 在wrapper中查找data-test为name的元素
 * @param {*} wrapper vue-test-utils的wrapper
 * @param {string} name data-test的属性值
 * @return {*}
 */
export const findFromWrapper = (wrapper, name) => {
    return wrapper.findAll(`[data-test=${name}]`);
}
