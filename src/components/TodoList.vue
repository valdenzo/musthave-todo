<template>
    <div>
        <h1 v-if="!editTitle" class="text-2xl mb-2" @click="startEditTitle">{{ props.todo.title }}</h1>
        <div v-else>
            <input ref="editTitleEl" v-model="todoList.title" type="text" placeholder="Add todo" class="px-2 rounded mr-1 mb-5 text-2xl" @blur="editTitle = false">
            <button class="py-1 px-2 bg-green-300 rounded" @click="editTitle = false">End</button>
        </div>
        <form @submit.prevent="addTodo">
            <input v-model="todo" type="text" placeholder="Add todo" class="py-1 px-2 rounded border mr-1 mb-5">
            <button type="submit" class="py-1 px-2 bg-green-300 rounded">Submit</button>
        </form>
        <div @dragover.prevent @drop="store.transferDragged(props.todo.id)">
            <TodoItem v-for="item in todoItems" :key="item.id" :item="item" :parent-id="props.todo.id" />
            <button class="py-1 px-2 bg-blue-300 rounded" @click="addEmpty">Add New</button>
        </div>
    </div>
</template>

<script setup>
import { useTodoStore } from '@/stores/todo';
import { nextTick, ref } from 'vue'
import TodoItem from './TodoItem.vue';
import { v4 as uuidv4 } from 'uuid';

const props = defineProps({
    todo: {
        type: Object,
        required: true,
    }
})

const store = useTodoStore()
const todo = ref(null)

const todoItems = ref(props.todo.todoItems)

const todoList = ref(props.todo)
const editTitle = ref(false)
const editTitleEl = ref(null)

function addEmpty() {
    todoItems.value.push({id: uuidv4(), title: null })
}

function addTodo() {
    todoItems.value.push({id: uuidv4(), title: todo.value })
    todo.value = null
}

async function startEditTitle() {
    editTitle.value = true

    await nextTick(() => {
        editTitleEl.value.focus()
    })
}
</script>