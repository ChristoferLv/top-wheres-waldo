const BASE_URL = "http://localhost:3000"

async function getMaps() {
    try {
        const response = await fetch(BASE_URL + '/maps', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return response;
    } catch (error) {
        console.log(error)
    }
}

async function saveOnLeaderboard(username) {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(BASE_URL + '/leaderboard', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ username: username })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

async function sendHit(coords, character) {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(BASE_URL + '/level/1/guess', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ coords, character })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

async function startGame(level) {
    try {
        const response = await fetch(BASE_URL + '/start/1', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        localStorage.setItem("token", data.token);
        return data;
    } catch (error) {
        console.log(error)
    }
}

export {
    sendHit,
    startGame,
    saveOnLeaderboard,
    getMaps
}