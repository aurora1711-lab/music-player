const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const playlist = document.getElementById('playlist');
const playlistItems = playlist.getElementsByTagName('li');

let currentSongIndex = 0;

function loadSong(index) {
    const songSrc = playlistItems[index].getAttribute('data-src');
    audio.src = songSrc;
    audio.play();
    updatePlayButton();
}

function updatePlayButton() {
    if (audio.paused) {
        playButton.textContent = 'Play';
    } else {
        playButton.textContent = 'Pause';
    }
}

playButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    updatePlayButton();
});

prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + playlistItems.length) % playlistItems.length;
    loadSong(currentSongIndex);
});

nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % playlistItems.length;
    loadSong(currentSongIndex);
});

Array.from(playlistItems).forEach((item, index) => {
    item.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
    });
});

audio.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % playlistItems.length;
    loadSong(currentSongIndex);
});

// Load the first song initially
loadSong(currentSongIndex);