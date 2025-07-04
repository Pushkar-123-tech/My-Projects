let currentAudio = null;
let currentSongIndex = 0;
let songs = [];
let isPlaying = false;
let seekbar = null;
let volumeSlider = null;
let currentTimeSpan = null;
let durationSpan = null;
let songname = null;
let playBtn = null;
let prevBtn = null;
let nextBtn = null;
let playIcon = null;

document.addEventListener('DOMContentLoaded', () => {
    // Select playbar icons and elements
    playBtn = document.querySelector('.play');
    prevBtn = document.querySelector('.previous');
    nextBtn = document.querySelector('.next');
    playIcon = playBtn.querySelector('i');
    seekbar = document.querySelector('.seekbar');
    volumeSlider = document.querySelector('.volume-slider');
    currentTimeSpan = document.querySelector('.current-time');
    durationSpan = document.querySelector('.duration');
    songname = document.querySelector('.songname');

    if (playBtn) playBtn.addEventListener('click', togglePlayPause);
    if (prevBtn) prevBtn.addEventListener('click', playPrevious);
    if (nextBtn) nextBtn.addEventListener('click', playNext);
    if (seekbar) seekbar.addEventListener('input', seekAudio);
    if (volumeSlider) volumeSlider.addEventListener('input', setVolume);

    getsongs();
});

function playSong(index) {
    if (songs.length === 0) return;
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentSongIndex = index;
    currentAudio = new Audio(`http://127.0.0.1:3000/songs/${songs[currentSongIndex]}`);
    currentAudio.volume = volumeSlider ? parseFloat(volumeSlider.value) : 1;
    currentAudio.play();
    isPlaying = true;
    updatePlayIcon();
    updateSongName();
    updateSeekbar();
    currentAudio.ontimeupdate = updateSeekbar;
    currentAudio.onended = () => playNext();
    currentAudio.onloadedmetadata = updateSeekbar;
}

function pauseSong() {
    if (currentAudio) {
        currentAudio.pause();
        isPlaying = false;
        updatePlayIcon();
    }
}

function togglePlayPause() {
    if (!currentAudio) {
        playSong(currentSongIndex);
    } else if (isPlaying) {
        pauseSong();
    } else {
        currentAudio.play();
        isPlaying = true;
        updatePlayIcon();
    }
}

function playNext() {
    if (songs.length === 0) return;
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
}

function playPrevious() {
    if (songs.length === 0) return;
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
}

function updatePlayIcon() {
    if (!playIcon) return;
    if (isPlaying) {
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
    } else {
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    }
}

function updateSongName() {
    if (songname && songs.length > 0) {
        songname.innerText = songs[currentSongIndex].replace(/\.mp3$/i, "");
    }
}

function updateSeekbar() {
    if (!currentAudio || !seekbar) return;
    seekbar.max = Math.floor(currentAudio.duration) || 0;
    seekbar.value = Math.floor(currentAudio.currentTime) || 0;
    if (currentTimeSpan) currentTimeSpan.textContent = formatTime(currentAudio.currentTime);
    if (durationSpan) durationSpan.textContent = formatTime(currentAudio.duration);
}

function seekAudio() {
    if (currentAudio && seekbar) {
        currentAudio.currentTime = seekbar.value;
    }
}

function setVolume() {
    if (currentAudio && volumeSlider) {
        currentAudio.volume = parseFloat(volumeSlider.value);
    }
}

function formatTime(sec) {
    if (isNaN(sec)) return '0:00';
    let m = Math.floor(sec / 60);
    let s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

// Fetch and display songs
async function getsongs() {
    try {
        let a = await fetch("http://127.0.0.1:3000/songs/");
        if (!a.ok) throw new Error('Failed to fetch songs directory');
        let res = await a.text();
        let div = document.createElement("div");
        div.innerHTML = res;
        let as = div.getElementsByTagName("a");

        songs = [];
        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if (element.href.endsWith(".mp3") || element.href.match(/\.mp3(\?.*)?$/i)) {
                let parts = element.href.split("/");
                let fileName = parts[parts.length - 1].split('?')[0];
                songs.push(fileName);
            }
        }

        // Display song names in .songlistname as new li elements
        const songlistname = document.querySelector('.songlistname');
        if (songlistname) {
            songlistname.innerHTML = ""; // Clear previous content
            if (songs.length === 0) {
                const li = document.createElement('li');
                li.textContent = "No songs found.";
                li.style.color = "#ccc";
                songlistname.appendChild(li);
            } else {
                songs.forEach((song, idx) => {
                    const li = document.createElement('li');
                    li.textContent = song.replace(/\.mp3$/i, "");
                    li.style.cursor = "pointer";
                    li.addEventListener('click', () => {
                        playSong(idx);
                    });
                    songlistname.appendChild(li);
                });
            }
        }
        updatePlayIcon();
        updateSongName();
        updateSeekbar();
        return songs;
    } catch (err) {
        const songlistname = document.querySelector('.songlistname');
        if (songlistname) {
            songlistname.innerHTML = "<li style='color:#f66;'>Failed to load songs</li>";
        }
        console.error('Error loading songs:', err);
        return [];
    }
}