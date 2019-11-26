export let raise = (error) => { throw error; };

export let times = (n) => Array(n).fill();

export let tail = (list) => list[list.length - 1];

export let sum = (list) => list.reduce((sum, n) => sum + n, 0);
