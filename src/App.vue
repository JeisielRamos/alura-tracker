<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': darkMode }">
    <div class="column is-one-quarter">
      <SideBar @whenSetTheme="setTheme" />
    </div>
    <div class="column is-three-quarter content">
      <FormTask @whenSaveTask="saveTask" />
      <div class="list">
        <TaskItem v-for="(task, idx) in tasks" :key="idx" :task="task"/>
        <BoxCard v-if="tasksIsEmpty">
          Você não está muito produtivo hoje :(
        </BoxCard>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue'
import FormTask from './components/FormTask.vue'
import TaskItem from './components/TaskItem.vue';
import BoxCard from './components/BoxCard.vue';
import ITask from './interfaces/ITask'

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    FormTask,
    BoxCard,
    TaskItem
  },
  data() {
    return {
      tasks: [] as ITask[],
      darkMode: false
    }
  },
  computed: {
    tasksIsEmpty() : boolean {
      return this.tasks.length === 0
    }
  },
  methods: {
    saveTask (task: ITask) {
      this.tasks.push(task)
    },
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
