<script>
import moment from 'moment';

export default {
    props: {
        user: {
            type: Object,
            default () {
                return {};
            }
        },
        propNames: {
            type: Object,
            default () {
                return {};
            }
        },
        dateFormat: {
            type: [String, Object],
            default () {
                return '';
            }
        }
    },

    methods: {
        getDateTime (time) {
            if (typeof this.dateFormat === 'string') {
                return moment(time).format(this.dateFormat);
            }

            return this.dateFormat(time);
        }
    },

    render () {
        const {
            [this.propNames.avatar]: avatar,
            [this.propNames.name]: name,
            [this.propNames.time]: time,
            [this.propNames.summary]: summary
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
                        <span class="w-user-time" data-test="datetime">{ this.getDateTime(time) }</span>
                    </div>
                    <p class="w-user-summary" data-test="summary">{ summary }</p>
                </div>
            </li>
        );
    }
};
</script>
