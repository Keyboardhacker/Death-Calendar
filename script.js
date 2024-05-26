document.addEventListener('DOMContentLoaded', (event) => {
  const gridContainer = document.getElementById('calendar');
  const totalWeeks = 4576;

  // Calculate the current week
  const startDate = new Date('2004-01-27');
  const currentDate = new Date('2024-05-25');
  const weeksSinceStart = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 7));

  // Load saved state from localStorage
  const savedState = JSON.parse(localStorage.getItem('calendarState')) || [];

  for (let i = 0; i < totalWeeks; i++) {
    const gridItem = document.createElement('div');
    gridItem.className = 'grid-item';

    const weekDate = new Date(startDate);
    weekDate.setDate(startDate.getDate() + i * 7);

    const weekNumber = Math.floor(i / 52) + 1;
    const weekDay = weekDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    gridItem.innerHTML = `<span>Week ${weekNumber}<br>${weekDay}</span>`;

    // Highlight the current week
    if (i === weeksSinceStart) {
      gridItem.classList.add('current-week');
    }

    // Restore completed state
    if (savedState.includes(i)) {
      gridItem.classList.add('completed');
    }

    gridItem.addEventListener('click', () => {
      gridItem.classList.toggle('completed');
      saveState();
    });

    gridContainer.appendChild(gridItem);
  }

  function saveState() {
    const completedItems = [];
    document.querySelectorAll('.grid-item.completed').forEach(item => {
      completedItems.push(Array.from(item.parentNode.children).indexOf(item));
    });
    localStorage.setItem('calendarState', JSON.stringify(completedItems));
  }

  // Add new week button functionality
  document.getElementById('new-week-button').addEventListener('click', () => {
    alert("New week functionality will be added soon!");
  });
});
