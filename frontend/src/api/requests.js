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

async function startGame(mapId) {
    try {
        const response = await fetch(BASE_URL + `/maps/${mapId}/start`, {
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

async function sendHit(coords, characterId) {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(BASE_URL + '/maps/guess', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ coords, characterId })
        });
        const data = await response.json();
        return data;
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

async function getLeaderboardForMap(mapId) {
    try {
        const response = await fetch(BASE_URL + '/leaderboard/' + mapId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        console.log(error)
    }
}

export {
    getMaps,
    startGame,
    sendHit,
    saveOnLeaderboard,
    getLeaderboardForMap
}