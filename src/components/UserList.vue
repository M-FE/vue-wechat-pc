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
                        placeholder="Search"
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

<style lang="scss">
@import '../assets/scss/var.scss';

.w-users-container {
    display: flex;
    flex-direction: column;
    color: $color-1;
    background-color: #fff;
}

.w-search-box {
    position: relative;
    padding: 8px;
    background-color: $color-6;
}

.w-search-icon {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    color: $color-1;
}

.w-search-inner {
    outline: 0;
    border: 0;
    width: 100%;
    border-radius: $radius;
    padding: 6px 8px 6px 32px;
    background-color: #fff;
    box-sizing: border-box;
}

.w-users-wrapper {
    overflow-y: auto;
    flex: 1;
    // margin-top: 12px;
}

.w-user-list {
    margin: 0;
    padding: 0;
    list-style: none;
}

.w-user-item {
    position: relative;
    display: flex;
    padding: 8px;
    transition: all .3s;
    cursor: pointer;

    &:hover {
        background-color: $color-5;
    }

    &:after {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        border-bottom: 1px solid $color-6;
        content: '';
    }
}

.w-user-avatar {
    width: 56px;
    height: 56px;
}

.w-user-item-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    flex: 1;
    padding-left: 8px;
}

.w-user-info {
    overflow: hidden;
    display: flex;
    align-items: center;
}

.w-user-name {
    flex: 1;
    @include ellipsis();
}

.w-user-name {
    font-weight: 400;
    font-size: $text-base;
    line-height: 1.3;
}

.w-user-time,
.w-user-summary {
    margin: 0;
    font-size: $text-sm;
    color: $color-2;
    line-height: 1.3;
}

.w-user-time {
    margin-left: 4px;
}

.w-user-summary {
    @include ellipsis();
}
</style>
