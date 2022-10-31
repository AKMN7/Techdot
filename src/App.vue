<template>
  <the-loader v-if="isLoading"/>
  <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
</template>

<script>
import TheLoader from './layout/TheLoader.vue';
import toaster from "./utils/toast";;

export default{
  components:{
    TheLoader
  },
  data(){
    return{
      isLoading: false
    };
  },
  async mounted() {
    try {
      const userAlreadySignedIn = await this.$store.dispatch("autoSignIn");

      if (userAlreadySignedIn) {
        console.log("USER FOUND !!!");
        this.isLoading = true;

        try {
          await this.$store.dispatch("getData");
          // console.log('Reached Here');
          let toID = this.$store.getters.data.length ? this.$store.getters.data[0].id : "noboards";
          this.$router.replace("/main/" + toID);
        } catch (error) {
          console.log(error);
          toaster.fireToast(this.$swal, false, error.message);
          this.$router.replace("/signin");
        }

        this.isLoading = false;
      } else {
        console.log("NO SIGNED IN USER FOUND");
        this.$router.replace("/signin");
        
      }
    } catch (error) {
      console.log(error);
    }
  },
}
</script>

<style scoped>
.route-enter-from {
  opacity: 0;
  transform: translateX(-500px);
}

.route-leave-to {
  opacity: 0;
  transform: translateX(500px);
}

.route-enter-active {
  transition: all 0.3s;
}
.route-leave-active {
  transition: all 0.3s;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>