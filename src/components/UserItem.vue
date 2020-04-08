<script>
import { DEFAULT_USER_PROPS, formatDatetime } from '@/utils/util';

export default {
    props: {
        user: {
            type: Object,
            default () {
                return {};
            }
        },
        dateFormat: {
            type: [String, Function],
            default () {
                return '';
            }
        },
        userPropNames: {
            type: Object,
            default () {
                return DEFAULT_USER_PROPS;
            }
        }
    },

    render () {
        const {
            [this.userPropNames.avatar]: avatar,
            [this.userPropNames.name]: name,
            [this.userPropNames.time]: time,
            [this.userPropNames.summary]: summary
        } = this.user;

        return (
            <li class="w-user-item">
                {
                    avatar &&
                    <img class="w-user-avatar" data-test="avatar" src={avatar} title={name} />
                }
                <div class="w-user-item-wrapper">
                    <div class="w-user-info">
                        <b class="w-user-name" data-test="username">{ name }</b>
                        <span class="w-user-time" data-test="datetime">
                            { formatDatetime(this.dateFormat, time) }
                        </span>
                    </div>
                    <p class="w-user-summary" data-test="summary">{ summary }</p>
                </div>
            </li>
        );
    }
};
</script>
