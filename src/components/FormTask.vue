<template>
    <div class="box">
        <div class="columns ">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa.">
                <input type="text" class="input" placeholder="Qual tarefa deseja iniciar?" v-model="description">
            </div>
            <div class="column is-justify-content-space-between">
               <TimerForm @whenStopTimer="finishTask"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TimerForm from './TimerForm.vue';

export default defineComponent({
    name: 'FormTask',
    components: {
        TimerForm
    },
    data () {
        return {
            description: ''
        }
    },
    methods: {
        finishTask (seconds: number) : void {
            this.$emit('whenSaveTask', {
                seconds: seconds,
                description: this.description
            })
            this.description = ''
        }
    },
    emits: ['whenSaveTask']
})
</script>

<style></style>