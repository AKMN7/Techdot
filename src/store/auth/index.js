import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    state() {
        return {
            token: null,
            email: null,
            name: null,
        }
    },
    mutations,
    actions,
    getters
};