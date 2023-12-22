import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid';

export const useTodoStore = defineStore('todo', {
    state: () => ({
        lInc: 0,
        inc: 0,
        todoList: [],
        dragging: null,
    }),
    actions: {
        setDragging(draggableItem) {
            this.dragging = draggableItem
        },
        removeTodoItem(listId, id) {
            const list = this.todoList.find(item => item.id === listId)

            if (list) {
                const index = list.todoItems.findIndex(item => item.id === id)
                list.todoItems.splice(index, 1)
            }
        },
        addTodo(title) {
            this.todoList.push({id: ++this.lInc, title: title, todoItems: []})
        },
        updateTodoItemAtIndex({listTitle, title, index}) {
            const list = this.todoList.find(item => item.title === listTitle)

            if (list) {
                list.todoItems[index].title = title
            }
        },
        addTodoItemAtIndex({listTitle, title, index}) {
            const list = this.todoList.find(item => item.title === listTitle)

            if (list) {
                const todo = {id: uuidv4(), title: title};

                if (index >= 0 && index < list.todoItems.length) {
                    list.todoItems.splice(index, 0, todo)
                } else {  
                    list.todoItems.push(todo)
                }
            }
        },
        updateDraggedOver(id) {
            this.dragging.draggedOver = id
        },
        transferDragged(toListId) {
            const sourceList = this.todoList.find(list => list.id === this.dragging.parentId);
            const destinationList = this.todoList.find(list => list.id === toListId);

            if (sourceList && destinationList) {
                const itemIndexInSource = sourceList.todoItems.findIndex(item => item.id === this.dragging.id);
                const [itemToMove] = sourceList.todoItems.splice(itemIndexInSource, 1);

                const positionInDestination = destinationList.todoItems.findIndex(item => item.id === this.dragging.draggedOver);
                const insertPosition = positionInDestination !== -1 ? positionInDestination : destinationList.todoItems.length;

                destinationList.todoItems.splice(insertPosition, 0, itemToMove);
            }
        },
    }
})