<script>
import UserList from './UserList';
import Messages from './Messages';
import {
    formatWidth,
    formatUserPropNames,
    formatMessagePropNames,
    DEFAULT_USER_PROPS,
    DEFAULT_MESSAGE_PROPS
} from '@/utils/util';

export default {
    props: {
        userList: {
            type: Array,
            default () {
                return [];
            }
        },
        messageList: {
            type: Array,
            default () {
                return [];
            }
        },
        usersWidth: {
            type: [String, Number],
            default: '300px'
        },
        userDateFormat: {
            type: [String, Function],
            default () {
                return 'MM/DD/YYYY';
            }
        },
        user: {
            type: Object,
            default () {
                return {};
            }
        },
        otherUser: {
            type: [Number, String],
            default: ''
        },
        userProps: {
            type: Object,
            default () {
                return DEFAULT_USER_PROPS;
            }
        },
        messageProps: {
            type: Object,
            default () {
                return DEFAULT_MESSAGE_PROPS;
            }
        },
        messageDateFormat: {
            type: [String, Function],
            default () {
                return 'MM/DD/YYYY HH:mm';
            }
        },
        popMaxWidth: {
            type: [String, Number],
            default: '50%'
        },
        placeholder: {
            type: String,
            default: 'Search'
        },
        scrollToBottom: {
            type: Boolean,
            default: true
        }
    },

    data () {
        return {
            userId: ''
        };
    },

    computed: {
        usersStyle () {
            return {
                width: formatWidth(this.usersWidth)
            };
        },
        userPropNames () {
            return formatUserPropNames(this.userProps);
        },
        messagePropNames () {
            return formatMessagePropNames(this.messageProps);
        },
        selectedUser () {
            return this.userList.find(user => user[this.userPropNames.id] === this.userId);
        }
    },

    methods: {
        userChange (userId) {
            this.userId = userId;
            this.$emit('update:otherUser', userId);
        }
    },

    watch: {
        otherUser: {
            immediate: true,
            handler (n) {
                this.userId = n;
            }
        }
    },

    render () {
        return (
            <div class="w-wrapper">
                <UserList
                    class="w-wrapper-users"
                    data-test="wrapper-users"
                    style={this.usersStyle}
                    value={this.userId}
                    users={this.userList}
                    userDateFormat={this.userDateFormat}
                    userPropNames={this.userPropNames}
                    placeholder={this.placeholder}
                    onChange={this.userChange}
                />
                <Messages
                    class="w-rapper-messages"
                    data-test="wrapper-messages"
                    list={this.messageList}
                    user={this.user}
                    toBottom={this.toBottom}
                    otherUser={this.selectedUser}
                    userPropNames={this.userPropNames}
                    messagePropNames={this.messagePropNames}
                    messageDateFormat={this.messageDateFormat}
                    popMaxWidth={this.popMaxWidth}
                    scopedSlots={{
                        messageItem: this.$scopedSlots.messageItem
                    }}
                />
            </div>
        );
    }
};
</script>
