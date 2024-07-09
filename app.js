document.addEventListener('DOMContentLoaded', () => {
    const playPauseButton = document.getElementById('playPause');
    const skipButton = document.getElementById('skip');
    const previousButton = document.getElementById('previous');
    const volumeControl = document.getElementById('volumeControl');
    const trackProgress = document.getElementById('trackProgress');
    const currentTrackElement = document.getElementById('currentTrack');
    const playlistElement = document.getElementById('playlist');
    const searchBar = document.getElementById('searchBar');

    let isPlaying = false;
    let currentTrackIndex = 0;
    let tracks = [
        { name: 'Amel Eih Fe Hayatak', artist: 'Amer Mounib', url: 'track1.mp3' },
        { name: 'Ma3lesh Asly Medalla3ha', artist: 'Tamer Ashour', url: 'track2.mp3' },
        { name: 'Bahebak W Khayef', artist: 'Tamer Ashour', url: 'track3.mp3' },
    ];

    const audio = new Audio(tracks[currentTrackIndex].url);
    currentTrackElement.innerText = `${tracks[currentTrackIndex].name} - ${tracks[currentTrackIndex].artist}`;

    playPauseButton.addEventListener('click', () => {
        const icon = playPauseButton.querySelector('i');
        if (isPlaying) {
            audio.pause();
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        } else {
            audio.play();
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        }
        isPlaying = !isPlaying;
    });

    skipButton.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        audio.src = tracks[currentTrackIndex].url;
        currentTrackElement.innerText = `${tracks[currentTrackIndex].name} - ${tracks[currentTrackIndex].artist}`;
        if (isPlaying) {
            audio.play();
        }
    });

    previousButton.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        audio.src = tracks[currentTrackIndex].url;
        currentTrackElement.innerText = `${tracks[currentTrackIndex].name} - ${tracks[currentTrackIndex].artist}`;
        if (isPlaying) {
            audio.play();
        }
    });

    volumeControl.addEventListener('input', () => {
        audio.volume = volumeControl.value / 100;
    });

    audio.addEventListener('timeupdate', () => {
        trackProgress.value = (audio.currentTime / audio.duration) * 100;
    });

    trackProgress.addEventListener('input', () => {
        audio.currentTime = (trackProgress.value / 100) * audio.duration;
    });

    function renderPlaylist(filteredTracks) {
        playlistElement.innerHTML = '';
        filteredTracks.forEach((track, index) => {
            const trackElement = document.createElement('div');
            trackElement.innerText = `${track.name} - ${track.artist}`;
            trackElement.addEventListener('click', () => {
                currentTrackIndex = index;
                audio.src = track.url;
                currentTrackElement.innerText = `${track.name} - ${track.artist}`;
                if (isPlaying) {
                    audio.play();
                }
            });
            playlistElement.appendChild(trackElement);
        });
    }

    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredTracks = tracks.filter(track => 
            track.name.toLowerCase().includes(searchTerm) || 
            track.artist.toLowerCase().includes(searchTerm)
        );
        renderPlaylist(filteredTracks);
    });

    // Initial render of the playlist
    renderPlaylist(tracks);
});
