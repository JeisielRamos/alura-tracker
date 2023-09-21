<template>
    <div class="projects">
        <h1 class="title"> Projetos </h1>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'VProjects'
})
</script>

<style scoped >
.projects {
    padding: 1.25rem
}
</style>