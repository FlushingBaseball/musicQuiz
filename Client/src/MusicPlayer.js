//useRef allows me to store a value that persits between componet renders
import React, {useEffect, useRef, useState} from 'react';
import mp3File from './Songs/rock-lobster.mp3'; //webpack bundles files before running the app so I had no idea why normal paths weren't working
//you need to explicitly import files 


// ##look at the object import that location pass that in as the source of the media player
// ## look at require when you pass the path into the media player so it 




function MusicPlayer(){
    const audioRef = useRef(null);  
    const [playlistSongs, setPlaylistSongs] = useState([]);
    const [curretSongIndex, setCurrentSongIndex]= useState(0);

    const [location, setLocation] = useState(null)

    const fetchPlaylistSongs = () =>{
        const playlistId = 1 // will change this to a variable later

        fetch(`/playlists/${playlistId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
            console.log(data)

            setPlaylistSongs(data.playlist_song);
            setLocation(playlistSongs[0].song.location)

        })
        .catch((error) => {
          console.error('Error fetching playlist songs:', error);
        });
    };

    useEffect(() => {
        fetchPlaylistSongs();
        
    }, []);

    useEffect(() =>{
        console.log('Inside useEffect');
        console.log(playlistSongs)
    }, [playlistSongs]);




    const playRandomPart = () =>{
        const audioElement = audioRef.current;
        if (audioElement){
            const songDuration = audioElement.duration;
            const randomStart = Math.random() * (songDuration - 15);
            audioElement.currentTime = randomStart;
            audioElement.play();
            setTimeout(()=>{
                audioElement.pause();
            }, 15000); //will pause after 15 seconds
        }
    };


    const handleNextSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlistSongs.length);
        setLocation(playlistSongs[curretSongIndex].song.location); // Auto-play the next song
        console.log(`current location is ${location}`)
      };

      if (playlistSongs == undefined){
        return(
            <div>
                <p>waiting for load</p>
            </div>
        )
      }

    return(
        <div>
        <audio ref={audioRef} controls>
        <source  src={location} type="audio/mpeg" /> 
        HEYYY, buddy your browser don't support the html5 audio player ahhhhhhhh lol
        </audio>
        <button onClick={playRandomPart}> Play random part</button>
        <button onClick={handleNextSong}> Play Next Song</button>



        <h2>Playlist Songs:</h2>
      {playlistSongs.length > 0 ? (
        <ul>
          {playlistSongs.map((songObject) => (
            <li key={songObject.id}>{songObject.song.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading playlist songs...</p>
      )}

        </div>

    );
};

export default MusicPlayer
