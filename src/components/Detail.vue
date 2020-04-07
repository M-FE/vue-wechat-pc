<script>
// list = [
//     {
//         time: '2020-02-02 14:00:00',
//         content: '',

//     }
// ];

export default {
    props: {
        list: {
            type: Array,
            default() {
                return [];
            }
        },
        title: {
            type: String,
            default: ''
        }
    },

    render() {
        return (
            <div>
                <b data-test="detail-title">{ this.title }</b>
            </div>
        );
    }
};
</script>
