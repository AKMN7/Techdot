export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.email = payload.email;
        state.name = payload.name;
    },
};