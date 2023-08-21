<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <SideBar />
    </div>
    <div class="column is-three-quarter">
      <FormTask @whenSaveTask="saveTask" />
      <div class="list">
        <TaskItem v-for="(task, idx) in tasks" :key="idx" :task="task"/>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue'
import FormTask from './components/FormTask.vue'
import TaskItem from './components/TaskItem.vue';
import ITask from './interfaces/ITask'

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    FormTask,
    TaskItem
  },
  data() {
    return {
      tasks: [] as ITask[]
    }
  },
  methods: {
    saveTask (task: ITask) {
      this.tasks.push(task)
    }
  }
});
</script>

<style>
.list {
  padding: 1.5rem;
}
</style>
