<template>
    <div class="flex items-center justify-around text-white text-md py-3 mx-1 rounded-lg bg-darkBG">
        <ion-icon name="sunny-outline" class="text-white text-2xl"></ion-icon>
        <label class="switch">
                <input type="checkbox" @change="toggleDarkTheme" :checked="checked">
                <span class="slider round"></span>
        </label>
        <ion-icon name="moon-outline" class="text-white text-2xl"></ion-icon>
    </div>
</template>


<script>
    import { ref } from '@vue/reactivity';
    import store from '../../store';

    export default{
        setup(){
            const checked = ref(store.getters.isDarkTheme);
            if(checked.value) document.documentElement.classList.add("dark");

            function toggleDarkTheme() {
                if(checked.value){
                    checked.value = false;
                    document.documentElement.classList.remove("dark");
                    localStorage.setItem('darkMode', 'false');
                } else{
                    checked.value = true;
                    document.documentElement.classList.add("dark");
                    localStorage.setItem('darkMode', 'true')
                } 
            }

            return {checked, toggleDarkTheme}
        }
    }
</script>