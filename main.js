// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

const radios = {
	0: "Qt0-9mO-ZXY",
	1: "roABNwbjZf4",
	2: "-9gEgshJUuY",
	3: "aGSYKFb_zxg",
    4: '7tNtU5XFwrU',
    5: '6qYTQI8FqzQ'
};

var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player("player", {
		height: "390",
		width: "640",
		videoId: radios[i],
		playerVars: {
			controls: 0,
			autohide: 1,
			enablejsapi: 1,
			loop: 1,
			showinfo: 0,
		},
		events: {
			onReady: onPlayerReady,
			onStateChange: getStatus,
		},
	});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	player.setVolume(50);
}

function stopVideo() {
	player.stopVideo();
}

window.addEventListener("keydown", handleArrows);
window.addEventListener("touchstart", handleStart);
window.addEventListener("touchend", handleEnd);

let isPlaying = false;
let i = 0;
let videoData;

const statusTextDesktop = document.querySelector(".desktop");
const statusTextPhone = document.querySelector(".phone");
const volume = document.querySelector(".informations__content--volume");
const credit = document.querySelector(".informations__content--credit");
const playerIframe = document.querySelector("iframe");

function handleArrows(e) {
	if (e.key === "ArrowRight") {
		goNext();
	} else if (e.key === "ArrowLeft") {
		goPrevious();
	} else if (e.key === "ArrowUp") {
		player.setVolume(player.getVolume() + 5);
	} else if (e.key === "ArrowDown") {
		player.setVolume(player.getVolume() - 5);
	} else if (e.key === " " && player.playVideo) {
		StartOrPause();
	}

	setTimeout(() => {
		if (player.getPlayerState() !== 2) {
			volume.innerText = `Volume: ${player.getVolume()}%`;
		} else {
			volume.innerText = `Radio paused`;
		}
	}, 50);
}

let initY;
let initX;
function handleStart(e) {
	initY = e.touches[0].clientY;
	initX = e.touches[0].clientX;
}

function handleEnd(e) {
	if (initY === null && initX === null) return;
	let diffY = initY - e.changedTouches[0].pageY;
	let diffX = initX - e.changedTouches[0].pageX;

	if (diffY > 0) {
		console.log("open menu");
	} else if (diffX < 0) {
		goPrevious();
	} else if (diffX > 0) {
		goNext();
	} else if (diffX === 0 && diffY === 0) {
		StartOrPause();
	}
}

function getStatus() {
	if (player.getPlayerState() === 0) {
		i === Object.keys(radios).length - 1 ? (i = 0) : i++;
		player.loadVideoById({
			videoId: radios[i],
			startSeconds: 0,
		});
	} else if (player.getPlayerState() === 1) {
		videoData = player.getVideoData();
        console.log(videoData);
		statusTextDesktop.innerHTML = `Listening - <a href=${player.getVideoUrl()} target='_blank'>${videoData.title}</a>`;
		statusTextPhone.innerHTML = `Listening - <a href=${player.getVideoUrl()} target='_blank'>${videoData.title}</a>`;
		credit.innerText = `Credit Music - ${videoData.author}`;
	}
}

function StartOrPause() {
	if (!isPlaying) {
		player.playVideo();
		isPlaying = true;
		volume.classList.add("box");
		credit.classList.add("box");
	} else {
		player.pauseVideo();
		isPlaying = false;
	}
}

function goPrevious() {
	i === 0 ? (i = Object.keys(radios).length - 1) : i--;
	player.loadVideoById({
		videoId: radios[i],
		startSeconds: 0,
	});
	isPlaying = true;
}

function goNext() {
	i === Object.keys(radios).length - 1 ? (i = 0) : i++;
	player.loadVideoById({
		videoId: radios[i],
		startSeconds: 0,
	});
	isPlaying = true;
}
