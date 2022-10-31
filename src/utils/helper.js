function decider(boardsArray) {
    return boardsArray.length ? { id: boardsArray[0].id, name: boardsArray[0].name } :
        { id: "noboards", name: "No Boards" };
}

function isDarkTheme() {
    let result = localStorage.getItem("darkMode");
    return result == 'true';
}

export default { decider, isDarkTheme };