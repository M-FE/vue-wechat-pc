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
    other: 'other'
};

/**
 * 获取用于User的PropNames
 * @param {*} props props
 * @return {object}
 */
export const userPropNames = (props) => {
    return {
        ...DEFAULT_USER_PROPS,
        ...props
    };
}

export const messagePropNames = (props) => {
    return {
        ...DEFAULT_MESSAGE_PROPS,
        ...props
    };
}
