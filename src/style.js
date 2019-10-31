function createHTML() {
  let div = document.createElement('div');
  document.body.appendChild(div);
  let murderCount = document.createElement('h1');
  div.appendChild(murderCount);
  document.querySelector('h1').classList.add('murder-count');
}
function updateMurderCount() {
  document.querySelector('.murder-count').innerText = game.player.murderCount;
}
