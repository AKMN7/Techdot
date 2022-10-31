<template>
    <div>
        <the-header/>
        <the-side-bar/>
        <the-loader v-if="isLoading"/>
        <!-- MAIN CONTENT  -->
        <section class="main_content" v-if="arrived">
            <div class="h-min" v-if="board">
                <div class="board-table">
                    <table-column 
                    v-for="table in board.tabels.filter(el => !el.toDelete)"
                    :key="table.id"
                    :tableID="table.id"
                    :boardID="board.id"
                    :columnName="table.name"
                    :columnColor="'#D65A31'"
                    :columnTasks="table.tasks"
                    @drop="moveTask($event, table.id)"
                    @dragenter.prevent
                    @dragover.prevent
                    @deleteTask="removeTask"
                    @addNewTask="addTask"
                    @editTask="editTask"
                    @updateTable="updateTableList"
                    />
                    <new-table-btn :boardID="board.id" @updateTable="updateTableList"/>
                </div>
            </div>
            <div v-else>CHOSE A BOARD</div>
        </section>
    </div>
</template>


<script>
    import TheHeader from '../layout/TheHeader.vue';
    import TheSideBar from '../layout/sidebar/TheSideBar.vue';
    import TableColumn from './TableColumn.vue';
    import NewTableBtn from './NewTableBtn.vue';
    import TheLoader from '../layout/TheLoader.vue'
    import { useStore } from 'vuex';
    import { computed, ref, watch } from '@vue/runtime-core';
    import { useRoute} from 'vue-router';
    export default{
        components: {
            TheHeader,
            TheSideBar,
            TableColumn,
            NewTableBtn,
            TheLoader
        },
        setup(){
            const store = useStore();
            const route = useRoute();

            const boards = computed(() => store.getters.data);

            let board = ref(boards.value.filter(el => el.id == route.params.boardID)[0] || null);

            const arrived = ref(true);
            const isLoading = ref(false);

            // Watch When boards Changes
            watch(() => boards, (newValue, oldVlaue) => {
                if(newValue.value){
                    board.value = newValue.value.filter(el => el.id == route.params.boardID)[0];
                    arrived.value = true;
                } 
            }, {deep: true});
            
            
            // Watch for boardID param change
            watch(() => route.params.boardID, async (newValue, oldValue) => {
                if(newValue){
                    board.value = store.getters.data.filter(el => el.id == newValue)[0];
                    if(board.value) store.commit('setHeaderText', board.value.name);

                    let oldBoard = store.getters.data.filter(el => el.id == oldValue)[0];
                    if(oldBoard) {
                        isLoading.value = true;
                        await store.dispatch('updateBoard', oldBoard);
                        isLoading.value = false;
                    }
                }
            });


            // Remove a taks from a table
            function removeTask(obj){
                let tempBoard = board.value;
                tempBoard.tabels[tempBoard.tabels.findIndex(el => el.id == obj.tableID)].tasks.splice(obj.taskID, 1);
                board.value = tempBoard;
            }

            // Add New Task 
            function addTask(obj) {
                let tempBoard = board.value;
                tempBoard.tabels[tempBoard.tabels.findIndex(el => el.id == obj.tableID)].tasks.push(obj.task);
                board.value = tempBoard
            }

            // Edit A specific task
            function editTask(obj){
                let tempBoard = board.value;
                tempBoard.tabels[tempBoard.tabels.findIndex(el => el.id == obj.tableID)].tasks[obj.taskID] = obj.task;
                board.value = tempBoard
            }

            // Move a task from a table
            function moveTask(event, tableID) {
                const orgTask = event.dataTransfer.getData('orgTask');
                const orgTable = event.dataTransfer.getData('orgTable');

                let tempBoard = board.value;
                
                if(orgTable != tableID){
                    const taskToMove = tempBoard.tabels[tempBoard.tabels.findIndex(el => el.id == orgTable)].tasks[orgTask];
                    // Remove from old 
                    tempBoard.tabels[tempBoard.tabels.findIndex(el => el.id == orgTable)].tasks.splice(orgTask, 1);
                    // Push to new
                    tempBoard.tabels[tempBoard.tabels.findIndex(el => el.id == tableID)].tasks.push(taskToMove);
                    // Update Board
                    board.value = tempBoard
                }
            }

            // Update Table List
            function updateTableList() {
                board.value = store.getters.data.filter(el => el.id == route.params.boardID)[0];
            }

            return {arrived, boards, board, removeTask, addTask, moveTask, updateTableList, editTask, isLoading}
        }
    }
</script>