<template>
    <div class="board-column flex flex-col" v-auto-animate>
        <div class="tableHeader flex items-center justify-between mb-5">
            <div class="flex items-center justify-start space-x-3">
                <ion-icon name="ellipse" :style="{color: columnColor}"></ion-icon>
                <p class="text-darkGrey dark:text-lightGrey  text-md">{{columnName}} ({{columnTasks.length}})</p>
            </div>
            <div>
                <ion-icon 
                    name="trash-outline" 
                    class="hidden cursor-pointer hover:scale-105 trashCan" 
                    @click="deleteTable"
                />  
            </div>
        </div>
        
        <table-task 
        v-for="(task, index) in columnTasks" 
        :key="`task-${index}`" 
        :taskText="task" 
        draggable="true"
        @dragstart="startDrag($event, {tableID, taskID: index})"
        @editX="editTask(index, tableID, task)"
        @removeX="deleteTask(index, tableID)"
        />
        <div @click="addNewTask"
        class="bg-transparent flex items-center justify-start p-2 text-left text-darkGrey dark:text-lightGrey rounded-lg mb-4 text-md shadow-md cursor-pointer hover:bg-primary hover:text-white ">
            <ion-icon name="add-outline" class="text-2xl mr-1"></ion-icon>
            <p>Add a task</p>
        </div>                    
    </div>
</template>

<script>
import TableTask from './TableTask.vue';
import { inject } from '@vue/runtime-core';
import { useStore } from "vuex";
import toaster from "../utils/toast";

export default {
    props: ['columnName', 'columnColor','columnTasks', 'tableID', 'boardID'],
    emits: ['deleteTask', 'addNewTask', 'editTask', 'updateTable'],
    components: {
        TableTask
    },
    setup(props, context){
        const store = useStore();
        const swal = inject("$swal");

        function startDrag(event, obj) {
            event.dataTransfer.dropEffect = 'move';
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('orgTask', obj.taskID);
            event.dataTransfer.setData('orgTable', obj.tableID);
            console.log('This taks is being dragged', obj);
        }

        function deleteTask(taskID, tableID){
            context.emit('deleteTask', {taskID, tableID})
        }


        function deleteTable() {
            store.dispatch('deleteTable', {tableID: props.tableID, boardID: props.boardID});
            context.emit('updateTable');
            toaster.fireToast(swal, true, "Table Deleted!");
        }

        async function addNewTask(){
            let input = await toaster.textInputPopUp(swal, 'Add New Task', `What's to be done?`);
            if(input){
                context.emit('addNewTask', {task: input, tableID: props.tableID});
            }
        }

        async function editTask(taskID, tableID, currText) {
            let input = await toaster.textInputPopUp(swal, 'Edit Task', currText, 'current');
            if(input){
                context.emit('editTask', {taskID, tableID, task: input});
            }
        }

        return {startDrag, deleteTask, addNewTask, editTask, deleteTable}
    }
}
</script>


<style scoped>
.tableHeader:hover .trashCan {
  display: block !important;
}
</style>