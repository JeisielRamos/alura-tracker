<template>
    <div class="box has-text-weight-bold" :style="stylesBox">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'BoxCard',    
    data() {
        return {
            stylesBox: {
                backgroundColor: '#FAF0CA'
            }
        }
    }
})
</script>
