<template>
    <div class="flex">
        <form @submit.prevent="addTodo" class="mb-3 mr-6">
            <input v-model="title" type="text" placeholder="Add todo list" class="border rounded py-1 px-2">
            <button type="submit" class="py-1 px-2 bg-green-300 rounded ml-1">Add</button>
        </form>
        <div class="mb-3">
            <input v-model="todoForm.listTitle" type="text" placeholder="Todo list title" class="border rounded py-1 px-2 mr-2">
            <input v-model="todoForm.title" type="text" placeholder="Todo item title" class="border rounded py-1 px-2 mr-2">
            <input v-model="todoForm.index" type="text" placeholder="Todo item index" class="border rounded py-1 px-2">        
            <button type="submit" class="py-1 px-2 bg-green-300 rounded ml-1" @click="updateTodoItem">Update</button>
            <button type="submit" class="py-1 px-2 bg-green-300 rounded ml-1" @click="addTodoItem">Insert</button>
        </div>
    </div>
    <div class="flex gap-x-2">
        <TodoList v-for="todo in todoList" :key="todo.id" :todo="todo" class="col-3" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import TodoList from './TodoList.vue';
import { useTodoStore } from '@/stores/todo';
import { storeToRefs } from 'pinia';

const title = ref(null)

const todoFormTemplate = {
    listTitle: null,
    title: null,
    index: null,
}

const todoForm = ref({...todoFormTemplate})

const store = useTodoStore()
const { todoList } = storeToRefs(store)

function addTodo() {
    store.addTodo(title.value)
    title.value = null
}

function addTodoItem() {
    store.addTodoItemAtIndex(todoForm.value)
    todoForm.value = {...todoFormTemplate}
}

function updateTodoItem() {
    store.updateTodoItemAtIndex(todoForm.value)
    todoForm.value = {...todoFormTemplate}
}
</script>