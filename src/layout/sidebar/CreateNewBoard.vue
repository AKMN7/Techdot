<template>
    <div @click="addNewBoard"
    class="flex items-center justify-center space-x-1 text-primary text-md tracking-wider py-3 mx-3 rounded-lg hover:bg-primary hover:text-white cursor-pointer">
        <ion-icon name="add-outline" class="text-xl"></ion-icon>
        <span>Create New Board</span>
    </div>
</template>

<script>
import { inject } from '@vue/runtime-core';
import { useStore } from "vuex";
import toaster from "../../utils/toast";
import { useRoute, useRouter } from 'vue-router';


export default {
    setup(){
        const router = useRouter();
        const store = useStore();
        const route = useRoute();
        const swal = inject("$swal");

        async function addNewBoard(){
            let input = await toaster.textInputPopUp(swal, 'Create New Board', 'Enter your new board name');
            if(input){
                try {
                    let lastBoard = store.getters.data.filter(el => el.id == route.params.boardID)[0];
                    if(lastBoard) await store.dispatch('updateBoard', lastBoard);

                    await store.dispatch("addBoard", input);
                    toaster.fireToast(swal, true, "Board Created!");
                    router.replace('/main/' + store.getters.data[store.getters.data.length - 1].id);
                } catch (error) {
                    console.log(error.message);
                }
            }
        }

        return {addNewBoard}
    }
}
</script>