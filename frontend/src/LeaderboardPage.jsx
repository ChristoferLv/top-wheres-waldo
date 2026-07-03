import { useEffect, useState } from "react"
import "./App.css"
import { getLeaderboardForMap, getMaps } from './api/requests.js'
import { Link } from "react-router";

function LeaderboardPage() {
    const [maps, setMaps] = useState([]);
    const [selectedMap, setSelectedMap] = useState(-1);
    const [leaderboard, setLeaderboard] = useState([]);
    let selectedName = maps.length != 0 ? (maps.find((map) => map.id == selectedMap)?.name) : undefined;

    useEffect(() => {
        async function fetchMaps() {
            const response = await getMaps();
            if (response.status == 200) {
                const data = await response.json();
                setMaps(data.data);
            }
        }
        fetchMaps();
    }, []);

    useEffect(() => {
        async function fetchLeaderboard() {
            const response = await getLeaderboardForMap(selectedMap);
            if (response.status == 200) {
                const data = await response.json();
                setLeaderboard(data.data);
            }
        }
        if (selectedMap != -1)
            fetchLeaderboard();
    }, [selectedMap]);

    function selectLeaderboard(mapId) {
        setSelectedMap(mapId);
    }

    if (!maps) return <><p className="loading">Loading leaderboard page....</p></>

    return (
        <div className="leaderboard-page">
            <div className="leaderboard">
                <div className="leaderboard-selection">
                    {maps.map((map) => {
                        return (
                            <button className="leaderboard-selection-item" key={map.id} onClick={() => { selectLeaderboard(map.id) }}>{map.name}</button>
                        )
                    })}
                </div>
                <hr />
                <div className="leaderboard-list">
                    {selectedMap != -1 ? (
                        <>
                            {leaderboard.length > 0 && <p>Leaderboard for map: {selectedName}</p>}
                            {leaderboard.length > 0 ? leaderboard.map((item, index) => {
                                return (
                                    <div key={item.id} className="leaderboard-item">
                                        <p>{index+1}º</p>
                                        <p>Player:{item.username}</p>
                                        <p>Time:{item.time}</p>
                                    </div>
                                )
                            }) : <p>No leaderboard entries for this map.</p>}
                        </>
                    ) : <p>Select a map to see the leaderboard</p>}

                </div>
            </div>
        </div>
    )
}

export default LeaderboardPage