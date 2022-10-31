<template>
    <div class="relative p-4 pb-2 text-left rounded-lg mb-4 text-md shadow-sm cursor-pointer bg-white dark:bg-verydarkBG text-darkGrey dark:text-lightGrey ">
      <p class="mt-3">{{taskText}}</p>
        <div class="absolute top-0 right-3 flex items-center justify-center">
            <div class="dropup">
                <button class="dropbtn text-darkGrey dark:text-lightGrey">...</button>
                <div class="dropup-content bg-verydarkBG dark:bg-lightBG">
                    <a class="hover:bg-darkBG  dark:hover:bg-gray-400 text-lightGrey dark:text-darkGrey"
                    @click="$emit('editX')">
                        <ion-icon name="create-outline" class="mr-2 -mt-0.5"/> Edit
                    </a>
                    <a class="hover:bg-darkBG  dark:hover:bg-gray-400 text-lightGrey dark:text-darkGrey"
                    @click="$emit('removeX')">
                        <ion-icon name="trash-outline" class="mr-2 -mt-0.5"/> Delete
                    </a>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    props: ['taskText'],
    emits: ['removeX', 'editX']
}
</script>

<style scoped>
/* Dropup Button */
.dropbtn {
  font-size: 30px;
  line-height: .5;
  padding: 1px;
  border: none;
}

/* The container <div> - needed to position the dropup content */
.dropup {
  position: relative;
  display: inline-block;
  border-radius: 8px;
}

/* Dropup content (Hidden by Default) */
.dropup-content {
  display: none;
  position: absolute;
  bottom: 5px;
  border-radius: 8px;
  min-width: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropup */
.dropup-content a {
  padding: 6px;
  text-decoration: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Show the dropup menu on hover */
.dropup:hover .dropup-content {
  display: block;
}
</style>