<template>
    <button type="button" class="sidebar-close text-darkGrey dark:text-lightGrey text-5xl font-thin -mt-7 -mr-2" @click="toggleMenuOpen">
        <ion-icon name="close-outline" class="text-4xl"></ion-icon>
    </button>
</template>


<script setup>
    const toggleMenuOpen = () => document.body.classList.toggle("open");
</script>