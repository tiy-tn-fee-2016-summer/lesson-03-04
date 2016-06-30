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

const cutenessPerPound = require('cuteness-per-pound');

test('it finds cuteness per pound', (assert) => {
  assert.equal(cutenessPerPound(10, 10), 1, 'probably the cutest thing in the world');
  assert.equal(cutenessPerPound(1, 2), 0.5);
  assert.equal(cutenessPerPound(1, 3), 0.3, 'it rounds to the nearest tenth');
});

const findCuteness = require('find-cuteness');

test('it can find the cuteness from an HTML element', (assert) => {
  const cat = createTile('Cat', 1, 2);
  const dog = createTile('Dog', 100, 50);

  assert.equal(findCuteness(cat), 1);
  assert.equal(findCuteness(dog), 100);
});

const findWeight = require('find-weight');

test('it can find the weight from an HTML element', (assert) => {
  const cat = createTile('Cat', 1, 2);
  const dog = createTile('Dog', 100, 50);

  assert.equal(findWeight(cat), 2);
  assert.equal(findWeight(dog), 50);
});

const showScore = require('show-score');

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

const setupTile = require('setup-tile');

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
