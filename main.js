// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

const radios = {
	0: {
		id: "Qt0-9mO-ZXY",
		bg: "./assets/space.webp",
		accentcolor: "#E67D86",
		name: "Space Lofi Hip-Hop",
		creditChannel: "https://www.youtube.com/channel/UCyD59CI7beJDU493glZpxgA",
	},
	1: {
		id: "roABNwbjZf4",
		bg: "./assets/tavern.webp",
		accentcolor: "#fce9bb",
		name: "Tavern/Inn Music",
		creditChannel: "https://www.youtube.com/@relaxationharmony8843",
	},
	2: {
		id: "-9gEgshJUuY",
		bg: "./assets/japan.webp",
		accentcolor: "#618779",
		name: "Japanese Lofi",
		creditChannel: "https://www.youtube.com/channel/UCyD59CI7beJDU493glZpxgA",
	},
	3: {
		id: "aGSYKFb_zxg",
		bg: "./assets/goodvibes.jpg",
		accentcolor: "#c8d881",
		name: "Good Vibes Only",
		creditChannel: "https://www.youtube.com/@LTBMusic",
	},
	4: {
		id: "7tNtU5XFwrU",
		bg: "./assets/ncs.webp",
		accentcolor: "#D52877",
		name: "NCS Music",
		creditChannel: "https://www.youtube.com/@NCSArcade",
	},
	5: {
		id: "6qYTQI8FqzQ",
		bg: "./assets/cyberpunk.webp",
		accentcolor: "#344454",
		name: "Cyberpunk Music",
		creditChannel: "https://www.youtube.com/@VersusMusicOfficial",
	},
};

var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player("player", {
		height: "390",
		width: "640",
		videoId: radios[i].id,
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
function onPlayerReady() {
	player.setVolume(50);
}

function stopVideo() {
	player.stopVideo();
}

let isPlaying = false;
let i = 0;
let videoData;

const playerIframe = document.querySelector("iframe");
const credit = document.querySelector(".credit-channel");
const radioName = document.querySelector(".currently-playing");
const goto = document.querySelector(".gotochannel");
const playpauseButtons = document.querySelectorAll(".play-pause-btn");

document.addEventListener("keydown", handlePlayKeyboard);
playpauseButtons.forEach((button) => {
	button.addEventListener("click", handlePlayClick);
	button.checked = false;
});

let previousTarget;
function handlePlayKeyboard(e) {
	if (player.playVideo && e.key === ' ') {
		e.preventDefault();
		const btn = document.getElementById(`${i}`);
		i = btn.id;

		if (previousTarget !== undefined) {
			i = previousTarget.id ? previousTarget.id : 0;
		} else {
			i = 0;
		}

		btn.checked = !btn.checked;

		previousTarget = btn;
		changeAccentColor(i);
		StartOrPause(i, !btn.checked);
	}
}

function handlePlayClick(e) {
	if (player.playVideo) {
		i = e.target.id
			? e.target.id
			: previousTarget !== undefined
			? previousTarget.id
			: 0;
		const btn = document.getElementById(`${i}`);

		if (e.target !== previousTarget && previousTarget !== undefined) {
			previousTarget.checked = false;
		}
		previousTarget = btn;
		changeAccentColor(i);
		StartOrPause(i, !btn.checked);
	}
}

function changeAccentColor(id) {
	const bg = document.querySelector(".cover");
	const accentCircle = document.querySelector(".accent-circle");

	bg.src = radios[id].bg;
	accentCircle.style.setProperty("--accent-color", `${radios[id].accentcolor}`);

	document.body.style.setProperty(
		"--accent-color",
		`${radios[id].accentcolor}`,
		"important"
	);
}

/* let initY;
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
} */

function getStatus() {
	if (player.getPlayerState() === 0) {
		i === Object.keys(radios).length - 1 ? (i = 0) : i++;
		player.loadVideoById({
			videoId: radios[i].id,
			startSeconds: 0,
		});
	} else if (player.getPlayerState() === 1) {
		videoData = player.getVideoData();
		radioName.innerText = radios[i].name;
		credit.innerHTML =
			videoData.author +
			`<a href='${radios[i].creditChannel}' target='_blank' class="gotochannel" style='color: ${radios[i].accentcolor}'> / go to channel</a>`;
	}
}

function StartOrPause(id, pause) {
	if (pause) {
		player.pauseVideo();
	} else {
		player.loadVideoById({
			videoId: radios[id].id,
			startSeconds: 0,
		});
	}
}
