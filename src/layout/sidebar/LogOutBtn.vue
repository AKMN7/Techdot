<template>
    <the-loader v-if="isLoading"/>
    <div @click="logoutPopUp"
    class="flex items-center justify-center space-x-2 text-white text-md tracking-wider py-3 mx-1 mb-3 rounded-lg bg-darkBG hover:bg-primary cursor-pointer">
        <ion-icon name="log-out-outline" class="text-white text-2xl"></ion-icon>
        <span>Logout</span>
    </div>
</template>

<script>
import { inject, ref } from '@vue/runtime-core';
import { useStore } from "vuex";
import toaster from "../../utils/toast";
import { useRoute, useRouter } from 'vue-router';
import TheLoader from '../TheLoader.vue';

export default {
    components: {
        TheLoader
    },
    setup(){
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const swal = inject("$swal");

        let isLoading = ref(false);

        // Log Out Handler
        function logoutPopUp() {
            swal.fire(toaster.logOutPopUpOptions()).then(async (result) => {
                if (result.isConfirmed) {

                    let lastBoard = store.getters.data.filter(el => el.id == route.params.boardID)[0];

                    if(lastBoard){
                        isLoading.value = true;
                        await store.dispatch('updateBoard', lastBoard);
                        
                        store.dispatch("logout");
                        router.replace("/signin");
                        isLoading.value = false;
                        toaster.fireToast(swal, true, "Log Out Success");
                    }else{
                        store.dispatch("logout");
                        toaster.fireToast(swal, true, "Log Out Success");
                        setTimeout(() => {
                            router.replace("/signin");
                        }, 1000);
                    }
                }
            });
        }

        return { logoutPopUp, isLoading }
    }
}
</script>