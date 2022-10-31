export default {
    setData(state, payload) {
        state.data = payload
    },
    deleteBoard(state, payload) {
        state.data.splice(state.data.findIndex(el => el.id == payload), 1);
    },
    addTable(state, payload) {
        state.data[state.data.findIndex(el => el.id == payload.boardID)].tabels.push(payload);
    },
    deleteTable(state, payload) {
        let boardIndex = state.data.findIndex(el => el.id == payload.boardID);
        let tableIndx = state.data[boardIndex].tabels.findIndex(el => el.id == payload.tableID);
        if (state.data[boardIndex].tabels[tableIndx].new) {
            state.data[boardIndex].tabels.splice(tableIndx, 1);
        } else {
            state.data[boardIndex].tabels[tableIndx] = { id: payload.tableID, toDelete: true };
        }
    }
};