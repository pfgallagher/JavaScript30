const mutation = arr => {
	const cleanArr = arr.map(el => [...el.toLowerCase()]);
	return cleanArr[1].every(el => cleanArr[0].includes(el));
};
	



console.log(mutation(["Alien", "line"])) 
