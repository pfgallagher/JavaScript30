const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

const redEffect = pixels => {
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i] += 100;
		pixels.data[i + 1] -= 50;
		pixels.data[i + 2] *= 0.5;
	}
	return pixels;
};

const rgbSplit = pixels => {
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i - 550] = pixels.data[i];
		pixels.data[i + 500] = pixels.data[i + 1];
		pixels.data[i - 550] = pixels.data[i + 2];
	}
	return pixels;
};

const greenScreen = pixels => {
	const levels = {};

	document.querySelectorAll(".rgb input").forEach(input => {
		levels[input.name] = input.value;
	});

	for (let i = 0; i < pixels.data.length; i += 4) {
		const red = pixels.data[i + 0];
		const green = pixels.data[i + 1];
		const blue = pixels.data[i + 2];

		if (
			red >= levels.rmin &&
			green >= levels.gmin &&
			blue >= levels.bmin &&
			red <= levels.rmax &&
			green <= levels.gmax &&
			blue <= levels.bmax
		) {
			pixels.data[i + 1] = 0;
		}
	}
	return pixels;
};

const paintToCanvas = () => {
	video.height /= 2;
	console.log(video);
	const width = video.videoWidth;
	const height = video.videoHeight;

	console.log(video.style);
	canvas.width = width;
	canvas.height = height;

	setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);
		let pixels = ctx.getImageData(0, 0, width, height);
		// pixels = redEffect(pixels);
		// pixels = rgbSplit(pixels);
		pixels = greenScreen(pixels);
		ctx.globalAlpha = 0.1;
		ctx.putImageData(pixels, 0, 0);
	}, 16);
};

const getVideo = async () => {
	try {
		const vid = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: false,
		});
		video.srcObject = vid;
		video.play();
	} catch (error) {
		console.log(error);
	}
};

const takePhoto = () => {
	snap.currentTime = 0;
	snap.play();
	const data = canvas.toDataURL("image/jpeg");
	const link = document.createElement("a");
	link.href = data;
	link.setAttribute("download", "pic ");
	link.innerHTML = `<img src ="${data}"/>`;
	strip.insertBefore(link, strip.firstChild);
};

video.addEventListener("canplay", paintToCanvas);

getVideo();
