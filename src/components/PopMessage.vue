<script>
import { formatWidth } from '@/utils/util';

export default {
    props: {
        placement: {
            type: String,
            default: 'left' /* left/right */
        },
        maxWidth: {
            type: [String, Number],
            default: '50%'
        },
        backgroundColor: {
            type: String,
            default: '#fff'
        }
    },

    computed: {
        className () {
            if (this.placement === 'right') {
                return 'pop-right';
            }

            return 'pop-left';
        },
        style () {
            return {
                'max-width': formatWidth(this.maxWidth),
                backgroundColor: this.backgroundColor
            };
        }
    },

    render () {
        return (
            <div data-test="pop-message" style={this.style} class={[
                this.className,
                'pop-message'
            ]}>{ this.$slots.default }</div>
        );
    }
};
</script>
