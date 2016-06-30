'use strict';

/* global require */

function createTile(name, cuteness, weight) {
  const tile = document.createElement('div');
  tile.classList.add('animal-tile');
  tile.innerHTML = `
    <div class="animal-tile__pic-frame">
      <img src="http://i.imgur.com/GP57YEH.gif" class="animal-tile__pic" alt="">
    </div>
    <h2 class="animal-tile__title">${name}</h2>
    <div class="animal-tile__stats">
      <p>Cuteness: <input class="animal-tile__cuteness" value="${cuteness}"></p>
      <p>Weight: <span class="animal-tile__weight">${weight}</span></p>
    </div>
    <div class="animal-tile__actions">
      <p class="animal-tile__result">Undecided</p>

      <button class="btn">Find Score</button>
    </div>
  `;

  return tile;
}

test('why doesn\'t qunit play nice today', (assert) => {
  assert.ok(true, 'it is running');
});

function cutenessPerPound(cuteness, weight) {
  return (cuteness / weight).toPrecision(1);
}

test('it finds cuteness per pound', (assert) => {
  assert.equal(cutenessPerPound(10, 10), 1, 'probably the cutest thing in the world');
  assert.equal(cutenessPerPound(1, 2), 0.5);
  assert.equal(cutenessPerPound(1, 3), 0.3, 'it rounds to the nearest tenth');
});

function findCuteness(tile) {
  const input = tile.querySelector('.animal-tile__cuteness');

  return input.value;
}

test('it can find the cuteness from an HTML element', (assert) => {
  const cat = createTile('Cat', 1, 2);
  const dog = createTile('Dog', 100, 50);

  assert.equal(findCuteness(cat), 1);
  assert.equal(findCuteness(dog), 100);
});

const findWeight = function (tile) {
  const span = tile.querySelector('.animal-tile__weight');

  return span.innerText;
};

test('it can find the weight from an HTML element', (assert) => {
  const cat = createTile('Cat', 1, 2);
  const dog = createTile('Dog', 100, 50);

  assert.equal(findWeight(cat), 2);
  assert.equal(findWeight(dog), 50);
});

function showScore(tile, score) {
  const texas = tile.querySelector('.animal-tile__result');

  texas.innerText = score;
}

test('it can show a new cuteness score', (assert) => {
  const cat = createTile('Cat', 1, 2);
  const dog = createTile('Dog', 100, 50);
  showScore(cat, 20);
  showScore(dog, 10);

  const catResult = cat.querySelector('.animal-tile__result').innerText.trim();
  const dogResult = dog.querySelector('.animal-tile__result').innerText.trim();

  assert.equal(catResult, '20');
  assert.equal(dogResult, '10');
});

function setupTile(tile) {
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

test('it recalculates the cuteness score when the button is clicked', (assert) => {
  const cat = createTile('Cat', 1, 2);
  const dog = createTile('Dog', 100, 50);

  setupTile(cat);
  setupTile(dog);

  cat.querySelector('.btn').click();
  dog.querySelector('.btn').click();

  const catResult = cat.querySelector('.animal-tile__result').innerText.trim();
  const dogResult = dog.querySelector('.animal-tile__result').innerText.trim();

  assert.equal(catResult, '0.5');
  assert.equal(dogResult, '2');
});
