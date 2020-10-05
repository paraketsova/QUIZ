
document.addEventListener("DOMContentLoaded", function(e) {
  let game = new Game();
  game.start();
});

function escapeHTML(text) {
  return text
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;');
}
