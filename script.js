const songs = [
{ title: "Song 1", file: "music/song1.mp3" },
{ title: "Song 2", file: "music/song2.mp3" },
{ title: "Song 3", file: "music/song3.mp3" }
];

let currentSongIndex = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");

let isPlaying = false;

function loadSong(song) {
title.textContent = song.title;
audio.src = song.file;
}

function playSong() {
isPlaying = true;
audio.play();
playBtn.textContent = "⏸️";
}

function pauseSong() {
isPlaying = false;
audio.pause();
playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
loadSong(songs[currentSongIndex]);
playSong();
});

nextBtn.addEventListener("click", () => {
currentSongIndex = (currentSongIndex + 1) % songs.length;
loadSong(songs[currentSongIndex]);
playSong();
});

audio.addEventListener('timeUpdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + '%';
});

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

audio.addEventListener('ended', () => {
    nextBtn.click();
});

loadSong(songs[currentSongIndex]);