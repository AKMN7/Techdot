<template>
    <router-link :to="toRoute"
    class="sidebarLink flex items-center text-darkGrey dark:text-lightGrey text-md tracking-wide px-3 py-3 mr-6 rounded-r-lg hover:bg-primary hover:text-white cursor-pointer">
        <ion-icon name="clipboard-outline" class="text-2xl mr-2"></ion-icon>
        <span class="mr-auto mt-1">{{name}}</span>
        <ion-icon 
        name="trash-outline" 
        class="hidden text-xl hover:scale-125 trashCan" 
        @click="deleteBoard"/>
    </router-link>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
    props: ['name', 'id'],
    setup(props){
        const router = useRouter();
        const store = useStore();

        async function deleteBoard(){
            try {
                
                const index = store.getters.data.findIndex(el => el.id == props.id);
                await store.dispatch("deleteBoard", props.id);

                let data = store.getters.data;
                if(index != 0 && data.length > 0) {
                    router.replace('/main/' + data[data.length -1].id);
                }
                
            } catch (error) {
                console.log(error);
            }
        }

        const toRoute = "/main/"+props.id;

        return {deleteBoard, toRoute}
    }
}
</script>


<style>
.router-link-exact-active,
.router-link-active {
  color: white;
  background-color: #D65A31;
  margin-right: 1.5rem;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
</style>