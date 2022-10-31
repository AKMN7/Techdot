<template>
    <div @click="addNewTable"
    class="board-column-btn cursor-pointer bg-lightGrey dark:bg-verydarkBG text-darkGrey dark:text-lightGrey  hover:border hover:border-primary">
        <div class="flex items-center justify-center space-x-2">
            <ion-icon name="add-outline" class="text-2xl"></ion-icon>
            <span class="font-bold">Add New Column</span>
        </div>             
    </div>
</template>

<script>
import { inject } from '@vue/runtime-core';
import { useStore } from "vuex";
import toaster from "../utils/toast";
import {nanoid} from "nanoid";

export default {
    props: ['boardID'],
    emits: ['updateTable'],
    setup(props, context){
        const store = useStore();
        const swal = inject("$swal");

        async function addNewTable(){
            let input = await toaster.textInputPopUp(swal, 'Create New Table', 'Enter your new table name');
            if(input){

                const data = {
                    boardID: props.boardID,
                    name: input,
                    id: nanoid(),
                    new: true,
                    tasks: []
                }

                store.dispatch("addTable", data);
                context.emit('updateTable');
                toaster.fireToast(swal, true, "Table Created!");
            }
        }

        return {addNewTable}
    }
}
</script>