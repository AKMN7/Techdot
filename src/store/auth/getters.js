export default {
    user(state) {
        return {
            email: state.email,
            name: state.name
        }
    },
    token(state) {
        return state.token
    },
    isAuthenticated(state) {
        return !!state.token
    }
};