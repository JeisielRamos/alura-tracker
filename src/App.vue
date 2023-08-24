<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': darkMode }">
    <div class="column is-one-quarter">
      <SideBar @whenSetTheme="setTheme" />
    </div>
    <div class="column is-three-quarter content">
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    SideBar
  },
  data() {
    return {
      darkMode: false
    }
  },
  methods: {
    setTheme (darkMode: boolean) {
      this.darkMode = darkMode
    }
  }
});
</script>

<style>
.list {
  padding: 1.5rem;
}

main {
  --bg-primary: #fff;
  --text-primary: #000;
}

main.dark-mode{
  --bg-primary: #2b2b2b;
  --text-primary: #ddd;
}

.content {
  background-color: var(--bg-primary);
}
</style>
