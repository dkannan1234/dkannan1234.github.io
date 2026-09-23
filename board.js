const cards = [...document.querySelectorAll('.experience-card')];
const filters = [...document.querySelectorAll('[data-filter]')];
const count = document.getElementById('board-count');

function filterBoard(category) {
  let visible = 0;
  cards.forEach(card => {
    card.hidden = category !== 'all' && !card.dataset.tags.split(' ').includes(category);
    if (!card.hidden) visible++;
  });
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  const label = filters.find(button => button.dataset.filter === category)?.textContent;
  count.textContent = `${visible} ${visible === 1 ? 'experience' : 'experiences'}${category === 'all' ? ' · across software, society & creativity' : ` · ${label}`}`;
}

filters.forEach(button => button.addEventListener('click', () => filterBoard(button.dataset.filter)));
document.querySelector('.board-controls').hidden = false;
filterBoard('all');

// Links from the homepage reveal the full story, including after filtering.
function revealLinkedCard() {
  const card = cards.find(card => `#${card.id}` === window.location.hash);
  if (!card) return;
  if (card.hidden) filterBoard('all');
  card.querySelector('details').open = true;
  requestAnimationFrame(() => card.scrollIntoView({ block: 'start' }));
}
window.addEventListener('hashchange', revealLinkedCard);
revealLinkedCard();
document.getElementById('year').textContent = new Date().getFullYear();
