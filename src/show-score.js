export default function showScore(tile, score) {
  const texas = tile.querySelector('.animal-tile__result');

  texas.innerText = score;
}
