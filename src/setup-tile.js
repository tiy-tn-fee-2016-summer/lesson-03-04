import cutenessPerPound from 'cuteness-per-pound';
import findWeight from 'find-weight';
import findCuteness from 'find-cuteness';
import showScore from 'show-score';

export default function setupTile(tile) {
  // Find a button in the current tile
  const btn = tile.querySelector('.btn');

  // This is the stuff to do after a click
  const afterClick = () => {
    // Find the cuteness within our tile
    const cuteness = findCuteness(tile);
    // Find the weight within our tile
    const weight = findWeight(tile);
    // Calculate the score
    const score = cutenessPerPound(cuteness, weight);
    // call showScore
    showScore(tile, score);
  };

  // Setup work when teh button is clicked
  btn.addEventListener('click', afterClick);
}
