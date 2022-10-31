import axios from "axios";

const endpoint = "http://localhost:3000";

export default {
    async getData(context) {
        console.log('GETTING THE USER DATA');

        // User's JWT
        const token = context.rootGetters.token;

        // Get Data Endpoint
        const endPoint = endpoint + "/api/v1/users/getData";

        // Fetch data
        let data = await axios.get(endPoint, { headers: { "Authorization": `Bearer ${token}` } }).catch((error) => {
            throw new Error(error.message);
        });

        context.commit('setData', data.data.data.results);
    },

    async addBoard(context, payload) {
        // User's JWT
        const token = context.rootGetters.token;

        // Get Data Endpoint
        const endPoint = endpoint + "/api/v1/users/addBoard";

        // Add A new Board data
        await axios.post(endPoint, { "name": payload }, { headers: { "Authorization": `Bearer ${token}` } })
            .catch((error) => {
                console.log(error);
                throw new Error(error.message);
            });

        // Fetch New data
        await context.dispatch("getData");
    },

    async deleteBoard(context, payload) {
        // User's JWT
        const token = context.rootGetters.token;

        // Get Data Endpoint
        const endPoint = endpoint + "/api/v1/users/deleteBoard/" + payload;

        // Delete the board locally
        context.commit("deleteBoard", payload);

        // Delete the board from the data base
        await axios.delete(endPoint, { headers: { "Authorization": `Bearer ${token}` } })
            .catch((error) => {
                console.log(error);
                throw new Error(error.message);
            });
    },

    async addTable(context, payload) {
        context.commit('addTable', payload);
    },


    async deleteTable(context, payload) {
        context.commit('deleteTable', payload);
    },

    //! Most Critical Function in the app
    async updateBoard(context, payload) {
        console.log('Update Board Triggerd');
        //console.log('This is the payload', payload);

        // User's JWT
        const token = context.rootGetters.token;

        // Get Data Endpoint
        const endPoint = endpoint + "/api/v1/users/updateBoard";

        // Update the board from the data base
        await axios.patch(endPoint, { board: payload }, { headers: { "Authorization": `Bearer ${token}` } })
            .catch((error) => {
                console.log('Error Here Line 79: ', error);
                throw new Error(error.message);
            });

        // Fetch New data
        await context.dispatch("getData");
    }
};