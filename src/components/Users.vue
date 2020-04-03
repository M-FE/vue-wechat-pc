<script>
import Item from './UserItem';

export default {
    props: {
        users: {
            type: Array,
            default() {
                return [];
            }
        },
        itemKey: {
            type: String,
            default: 'index'
        }
    },

    data() {
        return {
            keyword: ''
        };
    },

    components: {
        Item
    },

    computed: {
        filterUsers() {
            return this.defaultFilter(this.keyword);
        }
    },

    methods: {
        /**
         * 抛出user-change事件
         */
        handleChange(user, index) {
            this.$emit('user-change', user, index);
        },
        /**
         * keyword改变
         * @param {*} e
         */
        keywordChange(e) {
            this.keyword = e.target.value;
        },
        /**
         * 默认的对列表进行过滤的方法
         * @param {string} keyword
         */
        defaultFilter(keyword) {
            keyword = keyword.toLowerCase();

            return this.users.filter(user => user.name.includes(keyword));
        }
    },

    render () {
        return (
            <div>
                <input 
                    data-test="search"
                    value={ this.keyword }
                    onInput={ this.keywordChange }
                />
                <ul>
                    {
                        this.filterUsers.map((user, index) => {
                            const key = user[this.itemKey] !== undefined ? user[this.itemKey] : index;

                            return (<Item user={user} key={key} data-test="item" nativeOnClick={() => {
                                this.handleChange(user, index);
                            }} />);
                        })
                    }
                </ul>
            </div>
        );
    }
};
</script>
