function warnTheSheep(queue) {
  const farm = queue.slice().reverse();
  for (let i = 0; i < farm.length; i++) {
    if (farm[i] === 'wolf') {
      if (i === 0) {
        return `Pls go away and stop eating my sheep`;
      }
      return `Oi! Sheep number ${i}! You are about to be eaten by a wolf!`;
    }
  }
}
console.log(
  warnTheSheep(['sheep', 'wolf', 'sheep', 'sheep', 'sheep', 'sheep', 'sheep'])
);
