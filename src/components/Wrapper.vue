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
        messageDateFormat: {
            type: String,
            default: 'MM/DD/YYYY HH:mm'
        },
        popMaxWidth: {
            type: [String, Number],
            default: '50%'
        }
    },

    computed: {
        usersStyle () {
            return {
                width: formatWidth(this.usersWidth)
            };
        }
    },

    render () {
        return (
            <div class="w-wrapper">
                <UserList
                    class="w-wrapper-users"
                    data-test="wrapper-users"
                    style={this.usersStyle}
                    users={this.userList}
                    userDateFormat={this.userDateFormat}
                    userPropNames={formatUserPropNames(this.userPropNames)}
                />
                <Messages
                    class="w-rapper-messages"
                    data-test="wrapper-messages"
                    list={this.messageList}
                    user={this.user}
                    otherUser={this.otherUser}
                    userPropNames={formatUserPropNames(this.userPropNames)}
                    messagePropNames={formatMessagePropNames(this.messagePropNames)}
                    messageDateFormat={this.messageDateFormat}
                    popMaxWidth={this.popMaxWidth}
                />
            </div>
        );
    }
};
</script>
