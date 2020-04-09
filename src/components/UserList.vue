<script>
import Item from './UserItem';
import Icon from './Icon';
import { DEFAULT_USER_PROPS } from '@/utils/util';

export default {
    props: {
        value: {
            type: [String, Number],
            default: null
        },
        users: {
            type: Array,
            default () {
                return [];
            }
        },
        userDateFormat: {
            type: [String, Function],
            default () {
                return 'MM/DD/YYYY';
            }
        },
        userPropNames: {
            type: Object,
            default () {
                return DEFAULT_USER_PROPS;
            }
        },
        placeholder: {
            type: String,
            default: ''
        },
        defaultAvatar: {
            type: String,
            default: ''
        }
    },

    data () {
        return {
            keyword: ''
        };
    },

    components: {
        Item
    },

    computed: {
        filterUsers () {
            return this.defaultFilter(this.keyword);
        }
    },

    methods: {
        /**
         * 抛出user-change事件
         */
        handleChange (user, index) {
            this.$emit('input', user[this.userPropNames.id]);
            this.$emit('change', user[this.userPropNames.id]);
        },
        /**
         * keyword改变
         * @param {*} e
         */
        keywordChange (e) {
            this.keyword = e.target.value;
        },
        /**
         * 默认的对列表进行过滤的方法
         * @param {string} keyword
         */
        defaultFilter (keyword) {
            keyword = keyword.toLowerCase();

            return this.users.filter(user => user[this.userPropNames.name].includes(keyword));
        }
    },

    render () {
        return (
            <div class="w-users-container">
                <div class="w-search-box">
                    <input
                        class="w-search-inner"
                        data-test="search"
                        value={ this.keyword }
                        onInput={ this.keywordChange }
                        placeholder={this.placeholder}
                    />
                    <Icon class="w-search-icon" name="search" />
                </div>
                <div class="w-users-wrapper">
                    <ul class="w-user-list">
                        {
                            this.filterUsers.map((user, index) => {
                                return (
                                    <Item
                                        class={ [
                                            this.value === user[this.userPropNames.id] && 'selected'
                                        ] }
                                        data-test="item"
                                        user={user}
                                        key={user[this.userPropNames.id]}
                                        userPropNames={this.userPropNames}
                                        dateFormat={this.userDateFormat}
                                        defaultAvatar={this.defaultAvatar}
                                        nativeOnClick={() => {
                                            this.handleChange(user, index);
                                        }}
                                    />
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
};
</script>
