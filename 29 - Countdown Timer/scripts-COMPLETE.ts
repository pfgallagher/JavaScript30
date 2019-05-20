let countdown: number = 0;
const timerDisplay = document.querySelector(".display__time-left");
const endTimeDisplay = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const form = document.querySelector("#custom");

const displayTimeLeft = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds.toString().padStart(2, "0")}`;
	document.title = display;
	if (timerDisplay) {
		timerDisplay.textContent = display;
	}
};

const displayEndTime = (timestamp: number) => {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	if (endTimeDisplay) {
		endTimeDisplay.textContent = `Be back at: ${
			hour > 12 ? hour - 12 : hour
		}:${minutes.toString().padStart(2, "0")}`;
	}
};

const timer = (seconds: number) => {
	clearInterval(countdown);
	const curTime = Date.now();
	const endTime = curTime + seconds * 1000;
	displayTimeLeft(seconds);
	countdown = setInterval(() => {
		const secondsLeft = Math.round((endTime - Date.now()) / 1000);
		if (secondsLeft <= 0) {
			clearInterval(countdown);
		}
		displayTimeLeft(secondsLeft);
		displayEndTime(endTime);
	}, 1000);
};

buttons.forEach(button =>
	button.addEventListener("click", (event: any) => {
		const seconds = parseInt(event.target.dataset.time, 10);
		timer(seconds);
	}),
);

if (form) {
	form.addEventListener("submit", (event: any) => {
		event.preventDefault();
		const minutes = event.target.minutes.value;
		event.target.reset();
		timer(minutes * 60);
	});
}
