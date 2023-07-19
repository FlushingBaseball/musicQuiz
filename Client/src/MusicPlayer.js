//useRef allows me to store a value that persits between componet renders
import React, {useRef} from 'react';
import mp3File from './Songs/rock-lobster.mp3'; //webpack bundles files before running the app so I had no idea why normal paths weren't working
//you need to explicitly import files 

function MusicPlayer(){
    const audioRef = useRef(null);  


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

    return(
        <div>
        <audio ref={audioRef} controls>
        <source src={mp3File} type="audio/mpeg" /> 
        HEYYY, buddy your browser don't support the html5 audio player ahhhhhhhh lol
        </audio>
        <button onClick={playRandomPart}> Play random part</button>

        </div>

    );
};

export default MusicPlayer
