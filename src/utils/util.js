import moment from 'moment';

export const DEFAULT_USER_PROPS = {
    id: 'id',
    avatar: 'avatar',
    name: 'name',
    time: 'time',
    summary: 'summary'
};

export const DEFAULT_MESSAGE_PROPS = {
    id: 'id',
    content: 'content',
    time: 'time',
    other: 'other',
    background: 'background'
};

/**
 * 获取用于User的PropNames
 * @param {*} props props
 * @return {object}
 */
export const formatUserPropNames = (props) => {
    return {
        ...DEFAULT_USER_PROPS,
        ...props
    };
}

export const formatMessagePropNames = (props) => {
    return {
        ...DEFAULT_MESSAGE_PROPS,
        ...props
    };
}

/**
 * 传入一个数字或字符串，将其格式化为css可用单位
 * @param {string|number} width width
 */
export const formatWidth = (width) => {
    if (isNaN(width * 1)) {
        return width;
    }

    return width + 'px';
}

/**
 * 格式化日期
 * @param {function|string}} dateFormat
 * @param {string} time 日期
 */
export const formatDatetime = (dateFormat, time) => {
    if (typeof dateFormat === 'string') {
        return time ? moment(time).format(dateFormat) : '';
    }

    return dateFormat(time);
}
