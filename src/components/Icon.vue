<template>
    <svg
        class="icon"
        aria-hidden="true"
    >
        <use :xlink:href="`#icon-${name}`"></use>
    </svg>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: '',
            required: true
        }
    }
};
</script>
