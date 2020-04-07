<script>
import PopMessage from './PopMessage';
import { DEFAULT_USER_PROPS, DEFAULT_MESSAGE_PROPS, formatDatetime } from '@/utils/util';

export default {
    props: {
        list: {
            type: Array,
            default () {
                return [];
            }
        },
        user: {
            type: Object,
            default () {
                return {};
            }
        },
        otherUser: {
            type: Object,
            default () {
                return {};
            }
        },
        userPropNames: {
            type: Object,
            default () {
                return DEFAULT_USER_PROPS;
            }
        },
        messagePropNames: {
            type: Object,
            default () {
                return DEFAULT_MESSAGE_PROPS;
            }
        },
        /* 用于显示的日期的格式，同时用于分组 */
        messageDateFormat: {
            type: [String, Function],
            default () {
                return 'MM/DD/YYYY';
            }
        },
        popMaxWidth: {
            type: [String, Number],
            default: '50%'
        }
    },

    components: {
        PopMessage
    },

    computed: {
        groupList () {
            return this.groupMsgList(this.list);
        }
    },

    methods: {
        /**
         * 对列表进行分组
         * @param {array} list
         * @return {array}
         */
        groupMsgList (msgList) {
            const ret = [];
            const { time: propTime } = this.userPropNames;

            msgList = msgList.sort((a, b) => new Date(a[propTime]) - new Date(b[propTime]));

            let time = null;
            let list = [];
            msgList.forEach(item => {
                const itemTime = formatDatetime(this.messageDateFormat, item[propTime]);
                if (!time) {
                    time = itemTime;
                    list.push(item);
                    return;
                }

                if (time === itemTime) {
                    list.push(item);
                    return;
                }

                ret.push({ time, list });
                time = itemTime;
                list = [item];
            });

            if (time && list.length > 0) {
                ret.push({ time, list });
            }

            return ret;
        },
        /**
         * 对每一项进行渲染
         */
        renderItem (item, index) {
            const { id, content, other } = this.messagePropNames;
            const { avatar } = this.userPropNames;

            return (
                <li
                    data-test="messages-item"
                    key={item[id]}
                    class={['w-messages-item', !item[other] ? 'item-right' : 'item-left']}
                >
                    <img class="w-messages-avatar" data-test="messages-avatar" src={this.user[avatar]} />
                    <PopMessage
                        class="w-messages-item-content"
                        placement={item[other] ? 'left' : 'right'}
                        maxWidth={this.popMaxWidth}
                        backgroundColor={item[other] ? '#fff' : '#9eea6a'}
                    >
                        {
                            this.$scopedSlots.messageItem
                                ? this.$scopedSlots.messageItem(item, index)
                                : item[content]
                        }
                    </PopMessage>
                </li>
            );
        },
        /**
         * 对每个组进行渲染
         */
        renderGroup (group) {
            return (
                <div class="w-messages-group" key={group.time} data-test="messages-group">
                    <div class="w-messages-time">
                        <span class="w-messages-time-inner" data-test="messages-time">{ group.time }</span>
                    </div>
                    <ul class="w-messages-groups">
                        {
                            group.list.map((item, index) => this.renderItem(item, index))
                        }
                    </ul>
                </div>
            );
        }
    },

    render () {
        const { id, name } = this.userPropNames;

        if (!this.otherUser[id]) {
            return (
                <div class="w-messages-nodata" data-test="nodata">
                    <i class="iconfont icon-nodata"></i>
                </div>
            );
        }

        return (
            <div class="w-messages">
                <b class="w-messages-header" data-test="messages-title">
                    { this.otherUser[name] }
                </b>
                <div class="w-messages-container">
                    {
                        this.groupList.map(group => this.renderGroup(group))
                    }
                </div>
            </div>
        );
    }
};
</script>
