<template>
    <div 
        class="flex items-center gap-x-1"
        :class="{'border-blue-500 border-t': enteredDrag}"
        draggable="true"
        @dragenter="handleEnteredDrag"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd" 
        @mousedown="grabbing = true" 
        @mouseup="grabbing = false"
    >
        <div class="text-2xl" :class="{'cursor-grab': !grabbing, 'cursor-grabbing': grabbing}">+</div>
        <input v-model="item.title" type="text" class="py-1 px-2 rounded border mr-1 block my-2">
        <button @click="removeTodoItem">X</button>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useTodoStore } from '@/stores/todo';

const store = useTodoStore()

const props = defineProps({
    parentId: {
        type: Number,
        required: true
    },
    item: {
        type: Object,
        required: true
    }
})

const item = ref(props.item)
const grabbing = ref(false)
const enteredDrag = computed(() => store.dragging?.draggedOver === item.value.id)

function removeTodoItem() {
    store.removeTodoItem(props.parentId, item.value.id)
}

function handleDragEnd() {
    setTimeout(() => {
        store.setDragging(null)
        grabbing.value = false
    }, 10)
}

function handleDragStart() {
    store.setDragging({id: item.value.id, parentId: props.parentId})
}

function handleEnteredDrag() {
    enteredDrag.value = true
    store.updateDraggedOver(item.value.id)
}
</script>