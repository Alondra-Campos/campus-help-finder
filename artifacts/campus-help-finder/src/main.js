const resources = [
  {
    name: 'Food Pantry',
    category: 'Everyday essentials',
    description: 'Free groceries and essentials for students.',
  },
  {
    name: 'Counseling Services',
    category: 'Care & wellbeing',
    description: 'Free, confidential emotional support and mental health care.',
  },
  {
    name: 'Peer Tutoring',
    category: 'Learning support',
    description: 'Free one-to-one help with coursework and study skills.',
  },
  {
    name: 'Student Legal Aid',
    category: 'Advice & advocacy',
    description: 'Free guidance on housing, work, and everyday legal questions.',
  },
  {
    name: 'Campus Childcare',
    category: 'Family support',
    description: 'Free childcare support and referrals for student parents.',
  },
  {
    name: 'Emergency Housing',
    category: 'A safe place',
    description: 'Free urgent help finding a safe place to stay.',
  },
];

const list = document.querySelector('#resource-list');
const search = document.querySelector('#resource-search');
const count = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');
const clearButton = document.querySelector('#clear-search');

function cardMarkup(resource, index) {
  return `
    <article class="resource-card">
      <div class="card-top">
        <span class="resource-tag">${resource.category}</span>
        <span class="resource-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3>${resource.name}</h3>
      <p>${resource.description}</p>
      <a class="card-link" href="#resources" aria-label="Learn more about ${resource.name}">
        Learn more
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </article>`;
}

function renderResources() {
  const query = search.value.trim().toLocaleLowerCase();
  const filtered = resources.filter((resource) =>
    `${resource.name} ${resource.description} ${resource.category}`.toLocaleLowerCase().includes(query),
  );

  list.innerHTML = filtered.map(cardMarkup).join('');
  list.hidden = filtered.length === 0;
  emptyState.classList.toggle('is-visible', filtered.length === 0);
  clearButton.classList.toggle('is-visible', search.value.length > 0);

  if (!query) {
    count.textContent = 'Showing all 6 resources';
  } else if (filtered.length === 1) {
    count.textContent = 'Showing 1 resource';
  } else {
    count.textContent = `Showing ${filtered.length} resources`;
  }
}

search.addEventListener('input', renderResources);
clearButton.addEventListener('click', () => {
  search.value = '';
  renderResources();
  search.focus();
});
list.addEventListener('click', (event) => {
  if (event.target.closest('.card-link')) event.preventDefault();
});

renderResources();
