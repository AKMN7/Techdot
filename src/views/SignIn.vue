<template>
    <div class="h-max w-full lg:h-screen grid content-center justify-center py-3 lg:py-0">
        <div class="flex flex-col lg:flex-row items-center bg-white h-full w-[26rem] rounded-md overflow-hidden lg:h-[46rem] lg:w-[66rem]">
            <img src="../assets/Life.jpg" alt="LIFE" class="h-[20rem] w-full mb-3 lg:mb-0 lg:h-full lg:w-1/2">
            <div class="h-full w-full lg:w-1/2 flex flex-col items-center justify-center p-4 lg:p-10">
                <form @submit.prevent="signIn" class="flex flex-col gap-3 w-full">
                    <div class="flex flex-col gap-1 mb-2 text-center lg:text-left">
                        <h1 class="text-3xl font-bold">Sign In</h1>
                        <p class="text-sm text-zinc-500">Welcome Back, Please Enter your details.</p>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="name" class="ml-1">Email</label>
                        <input type="text" id="name" placeholder="Enter your email" class="flex-auto p-3 block rounded-md font-medium outline-none border border-grey-500 focus:border-primary focus:text-zinc-500" required spellcheck="false" v-model="email">
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="password" class="ml-1">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" class="flex-auto p-3 block rounded-md font-medium outline-none border border-grey-500 focus:border-primary focus:text-zinc-500" required spellcheck="false" v-model="password">
                    </div>
                    <div class="mt-4">
                        <button class="bg-primary w-full font-medium text-white px-4 py-3 rounded-lg shadow-sm hover:bg-orange-400">
                            <span v-if="isLoading">Loading ...</span>
                            <span v-else>Sign In</span>
                        </button>
                    </div>
                </form>
                <div class="mt-4 w-full">
                        <GoogleLogin :callback="callback" popup-type="TOKEN" 
                        class="w-full border border-grey-500 shadow-sm rounded-lg hover:border-primary">
                            <button
                            class="flex items-center justify-center gap-4 bg-transparent w-full font-medium text-darkGrey  px-4 py-2">
                            <img src="../assets/googleicon.png" alt="test" class="h-7 w-7"> Sign In With Google</button>
                        </GoogleLogin>
                    </div>
                    <div class="mt-4 text-center">
                        <p>Don't have an account? <router-link to="/signup" class="text-primary underline font-bold cursor-pointer">Sign Up</router-link></p>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import {ref, inject} from 'vue';
import toaster from "../utils/toast";
import helper from "../utils/helper";

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const swal = inject("$swal");

        let isLoading = ref(false);
        let email = ref("");
        let password = ref("");

        async function signIn() {
            const data = {
                email: email.value,
                password: password.value
            };

            isLoading.value = true;

            try{
                await store.dispatch("signIn", data);
                toaster.fireToast(swal, true, "Sign In Success");
                
                // Get the first board data
                let toBoard = helper.decider(store.getters.data);
                // Set the header text and redirect                                    
                store.commit('setHeaderText', toBoard.name);
                setTimeout(() => {
                    router.replace("/main/" + toBoard.id);
                }, 2000);
            }catch(err){
                toaster.fireToast(swal, false, "Invalid Credentails");
            }

            isLoading.value = false;
        }

        const callback = async (response) => {
            const data = {token: response.access_token, type: 'SignIn'};

            try{
                await store.dispatch("googleAuth", data);
                toaster.fireToast(swal, true, "Sign In Success");

                // Get the first board data
                let toBoard = helper.decider(store.getters.data);
                // Set the header text and redirect                                    
                store.commit('setHeaderText', toBoard.name);
                setTimeout(() => {
                    router.replace("/main/" + toBoard.id);
                }, 2000);

            }catch(err){
                toaster.fireToast(swal, false, err.message);
            }
        }

        return{
            signIn, callback, email, password, isLoading
        }
    },
}
</script>