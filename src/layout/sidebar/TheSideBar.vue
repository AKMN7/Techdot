<template>
    <!-- SIDEBAR -->
    <nav
        class="sidebar-menu border-r bg-white border-r-lightGrey dark:bg-verydarkBG dark:border-r-gray-700">
        <!-- LOGO AND 'X' BTN -->
        <div class=" p-4 flex items-center justify-between mb-8">
            <img src="../../assets/TEST.png" class="h-9 w-44 mt-5" alt="Logo">
            <close-menu/>
        </div>

        <!-- LINKS -->
        <div class=" flex flex-col space-y-3 mb-auto">
            <!-- TOTAL BOARDS -->
            <h6 class="text-darkGrey dark:text-lightGrey text-xs font-bold tracking-wide pl-4">ALL BOARDS ({{boards.length}})</h6>
            <!-- BOARD LINKS -->
            <board-link v-for="board in boards" :key="board.id" :id="board.id" :name="board.name"/>
            <create-new-board/>
        </div>

        <!-- LOGOUT OUT AND THEME TOGGLE  -->
        <div class="div flex flex-col py-6 px-3">
            <log-out-btn/>
            <dark-theme-toggle/>
        </div>
    </nav>
</template>

<script>
import CreateNewBoard from "./CreateNewBoard.vue";
import DarkThemeToggle from "./DarkThemeToggle.vue";
import CloseMenu from "./CloseMenu.vue";
import LogOutBtn from './LogOutBtn.vue'
import BoardLink from "./BoardLink.vue";

import { useStore } from "vuex";
import {computed} from "vue";

export default {
    components:{
        CreateNewBoard,
        DarkThemeToggle,
        BoardLink,
        CloseMenu,
        LogOutBtn
    },
    setup(){
        const store = useStore();
        const boards = computed(() => store.getters.data);
        
        return{ boards } 
    }
}
</script>