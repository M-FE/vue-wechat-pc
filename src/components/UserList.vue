<script>
import Item from './UserItem';

const DEFAULT_PROPS = {
    avatar: 'avatar',
    name: 'name',
    time: 'time',
    summary: 'summary'
};

export default {
    props: {
        users: {
            type: Array,
            default () {
                return [];
            }
        },
        idField: {
            type: String,
            default: 'id'
        },
        props: {
            type: Object,
            default () {
                return { };
            }
        },
        dateFormat: {
            type: [String, Function],
            default () {
                return 'MM/DD/YYYY';
            }
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
        },
        propNames () {
            return {
                ...DEFAULT_PROPS,
                ...this.props
            }
        }
    },

    methods: {
        /**
         * 抛出user-change事件
         */
        handleChange (user, index) {
            this.$emit('user-change', user, index);
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

            return this.users.filter(user => user[this.propNames.name].includes(keyword));
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
                    />
                    <i class="w-search-icon iconfont icon-search"></i>
                </div>
                <div class="w-users-wrapper">
                    <ul class="w-user-list">
                        {
                            this.filterUsers.map((user, index) => {
                                return (
                                    <Item
                                        user={user}
                                        key={user[this.idField]}
                                        propNames={this.propNames}
                                        data-test="item"
                                        dateFormat={this.dateFormat}
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
