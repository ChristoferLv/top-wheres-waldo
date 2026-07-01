import { useEffect, useState } from "react"
import "./App.css"
import { getMaps } from './api/requests.js'

function HomePage() {
    const [mapsList, setMapsList] = useState(null);

    useEffect(() => {
        async function fetchMaps() {
            console.log("fetching maps")
            const response = await getMaps();
            if (response.status == 200) {
                const data = await response.json();
                setMapsList(data.data);
            }
        }
        fetchMaps();
    }, []);

    if (!mapsList) return <><p>Loading maps list....</p></>

    return (
        <div className="maps-page">
            <h1>Maps</h1>
            <div className="maps-list">
                {mapsList.map((map) => {
                    return (
                        <div key={map.id} className="map-item">
                            <p>Map: {map.name}</p>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default HomePage