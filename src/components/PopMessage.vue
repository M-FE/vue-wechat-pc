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

<style lang="scss">
@import '../assets/scss/var.scss';

.pop-message {
    position: relative;
    display: inline-block;
    border: 1px solid $color-6;
    border-radius: $radius;
    padding: 6px 12px;
    font-size: $text-base;
    line-height: 1.5;
    min-width: 30px;
    background-color: #fff;

    &:after {
        position: absolute;
        top: 10px;
        width: 6px;
        height: 6px;
        border: 1px solid $color-6;
        transform: rotate(45deg);
        background-color: #fff;
        content: '';
    }

    &.pop-left {
        &:after {
            left: -4px;
            border-width: 0 0 1px 1px;
        }
    }

    &.pop-right {
        &:after {
            right: -4px;
            border-width: 1px 1px 0 0;
        }
    }
}
</style>
