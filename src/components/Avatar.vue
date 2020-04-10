<script>
export default {
    props: {
        avatar: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },

    computed: {
        text () {
            if (!this.title) {
                return '';
            }

            /* 包含双字节（中文等） */
            if (/[\u4e00-\u9fa5]+/.test(this.title)) {
                return this.title[0].toUpperCase();
            }

            /* 英文取头两个单词的首字母 */
            return this.title.split(' ').filter(Boolean).slice(0, 2).map(s => (s[0] || '').toUpperCase()).join('');
        }
    },

    render () {
        return (
            <div class={['w-avatar']}>
                {
                    this.avatar
                        ? <img class="w-avatar-img" data-test="avatar-img" src={this.avatar} title={this.title} />
                        : <div class="w-avatar-text" data-test="avatar-text">{this.text}</div>
                }
            </div>
        );
    }
};
</script>
