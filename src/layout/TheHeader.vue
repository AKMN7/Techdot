<template>
    <!-- HEADER -->
    <header
            class="header border-b bg-white border-b-lightGrey dark:bg-verydarkBG dark:border-b-gray-700  ">
            <div class="sidebar-overlay" @click="toggleMenuOpen"></div>

            <button type="button" class="sidebar-burger" @click="toggleMenuOpen">
                <ion-icon name="menu-outline" class="text-4xl text-darkGrey dark:text-lightGrey"></ion-icon>
            </button>

            <h1 class="header-title text-darkGrey dark:text-lightGrey">{{headerText}}</h1>

            <div class="profile-btn">
                
            </div>
        </header>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
    setup(){
        const store = useStore();
        const headerText = computed(() => store.getters.headerText);

        const toggleMenuOpen = () => document.body.classList.toggle("open");
        return{toggleMenuOpen, headerText} 
    }
}
</script>