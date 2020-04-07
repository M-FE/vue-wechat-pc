<script>
export default {
    props: {
        placement: {
            type: String,
            default: 'left' /* left/right */
        },
        maxWidth: {
            type: [String, Number],
            default: null
        },
        backgroundColor: {
            type: String,
            default: '#fff'
        }
    },

    computed: {
        className() {
            if (this.placement === 'right') {
                return 'pop-right';
            }

            return 'pop-left';
        },
        style() {
            if (!this.maxWidth) {
                return {};
            }

            if (typeof this.maxWidth === 'number') {
                return { 'max-width': this.maxWidth + 'px' };
            }

            return { 
                'max-width': this.maxWidth,
                backgroundColor: this.backgroundColor
            };
        }
    },

    render() {
        return (
            <div data-test="pop-message" style={this.style} class={[
                this.className,
                'pop-message'
            ]}>{ this.$slots.default }</div>
        );
    }
};
</script>
