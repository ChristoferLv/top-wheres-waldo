import { useEffect, useState } from "react"
import "./App.css"
import { getMaps } from './api/requests.js'
import { Link } from "react-router";

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

    if (!mapsList) return <><p className="loading">Loading maps list....</p></>

    return (
        <div className="maps-page">
            <div className="maps-body">
                <div className="waldo"></div>
                <div className="maps-list">
                    <h1>Maps List</h1>
                    {mapsList.map((map) => {
                        return (
                            <Link key={map.id} to={"/map/" + map.id}>
                                <div  className="map-item">
                                    <img src={`/picture${map.id}.jpg`} alt={`Map ${map.id} mini picture`} />
                                    <p>{map.name}</p>
                                </div>
                            </Link>)
                    })}
                </div>
                <div className="waldo"></div>
            </div>
        </div>
    )
}

export default HomePage