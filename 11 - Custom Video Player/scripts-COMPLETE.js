const [
	video,
	,
	progressBar,
	progressFill,
	playButton,
] = document.querySelectorAll(".player *");

const playPause = () => {
	const [method, symbol] = video.paused ? ["play", "❚❚"] : ["pause", "►"];
	playButton.textContent = symbol;
	video[method]();
};

const scrub = event => {
	video.currentTime =
		(event.offsetX / event.target.offsetWidth) * video.duration;
};

const progress = () => {
	progressFill.style.flexBasis = `${(video.currentTime / video.duration) *
		100}%`;
};

const slider = event => {
	const name = event.target.name;
	if (name === "volume" || name === "playbackRate") {
		video[name] = event.target.value;
	}
};

const skip = event => {
	const skipTime = parseFloat(event.target.dataset.skip);
	if (skipTime) video.currentTime += skipTime;
};

document.addEventListener("input", event => slider(event));
document.addEventListener("click", event => skip(event));

video.addEventListener("timeupdate", progress);
video.addEventListener("click", playPause);
video.addEventListener("ended", () => {
	playButton.textContent = "►";
});

playButton.addEventListener("click", playPause);

let mousedown = false;
progressBar.addEventListener("click", scrub);
progressBar.addEventListener("mousemove", event => mousedown && scrub(event));
progressBar.addEventListener("mousedown", () => {
	mousedown = true;
});
progressBar.addEventListener("mouseup", () => {
	mousedown = false;
});
