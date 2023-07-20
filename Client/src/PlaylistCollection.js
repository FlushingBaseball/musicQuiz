import PlaylistCard from "./PlaylistCard"
import { useState, useEffect } from "react"

function PlaylistCollection() {
    const [playlists, setPlaylists] = useState([])


useEffect(() => { 
    fetch('/playlists')
    .then(resp => resp.json())
    .then(data => setPlaylists(data))
}, [])

const individualplaylist = playlists.map(playlist => {
    return <PlaylistCard key={playlist.id} {...playlist}
    />
})

return (
    <div className="playlist-collection">
    {individualplaylist}
    </div>
)}

export default PlaylistCollection