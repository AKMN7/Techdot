import { createStore } from "vuex";

import authModule from "./auth/index";
import mainModule from "./main/index";
import helper from "../utils/helper";

const store = createStore({
    state() {
        return {
            headerText: "No Boards",
            isDarkTheme: helper.isDarkTheme()
        }
    },
    getters: {
        headerText(state) {
            return state.headerText;
        },
        isDarkTheme(state) {
            return state.isDarkTheme;
        }
    },
    mutations: {
        setHeaderText(state, payload) {
            state.headerText = payload;
        }
    },
    modules: {
        auth: authModule,
        main: mainModule
    }
});

export default store;