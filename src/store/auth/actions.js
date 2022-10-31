import axios from "axios";

const endpoint = "http://localhost:3000";

export default {

    async signIn(context, payload) {

        // API END POINT
        const signInGateAway = endpoint + "/api/v1/users/signin";

        const data = {
            email: payload.email,
            password: payload.password
        };

        // Send HTTP Request 
        const response = await axios.post(signInGateAway, data);

        if (response.status !== 201) throw new Error("Invalid Credentials!");

        // Extract Data from Response
        const token = response.data.token;
        const userData = response.data.data.user;

        // Store use to the local storage
        localStorage.setItem('token', token);
        localStorage.setItem('email', userData.email);
        localStorage.setItem('name', userData.name);

        // Set User
        context.commit('setUser', {
            email: userData.email,
            name: userData.name,
            token
        });

        // Fetch New data
        await context.dispatch("getData");
    },

    autoSignIn(context) {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        const name = localStorage.getItem('name');

        if (token && name && email) {
            context.commit('setUser', {
                email, name, token
            });

            return true;
        }

        return false;
    },

    async signUp(context, payload) {

        // API END POINT
        const signUpGateAway = endpoint + "/api/v1/users/signup";

        const data = {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            passwordConfirm: payload.passwordConfirm
        };

        const response = await axios.post(signUpGateAway, data).catch(function (error) {
            console.log(error);
            throw new Error(error.response.data.msg);
        });

        // Extract Data from Response
        const token = response.data.token;
        const userData = response.data.data.user;

        // Set User
        context.commit('setUser', {
            email: userData.email,
            name: userData.name,
            token
        });

        // Fetch New data
        await context.dispatch("getData");
    },

    async googleAuth(context, payload) {

        // API END POINT
        const googleAuthGateAway = endpoint + "/api/v1/users/google";

        const response = await axios.post(googleAuthGateAway, { token: payload.token, type: payload.type })
            .catch(function (error) {
                console.log('Errro 1', error);
                throw new Error(error);
            });

        // Extract Data from Response
        const token = response.data.token;
        const userData = response.data.data.user;

        // Store use to the local storage
        localStorage.setItem('token', token);
        localStorage.setItem('email', userData.email);
        localStorage.setItem('name', userData.name);

        // Set User
        context.commit('setUser', {
            email: userData.email,
            name: userData.name,
            token
        });

        // Fetch New data
        await context.dispatch("getData");

        if (payload.type === 'SignUp') return response.data.specialMSG;
    },

    async logout(context) {
        // Remove All Items from local storage
        localStorage.clear();

        // Set User
        context.commit('setUser', {
            email: null,
            name: null,
            token: null
        });
    }

};