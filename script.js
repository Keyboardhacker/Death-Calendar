document.addEventListener('DOMContentLoaded', (event) => {
  const gridContainer = document.getElementById('calendar');
  const totalWeeks = 4576;

  // Load saved state from localStorage
  const savedState = JSON.parse(localStorage.getItem('calendarState')) || [];

  // Calculate the current week
  const startDate = new Date('2004-01-27'); // Replace with your birthdate
  const currentDate = new Date();
  const weeksSinceStart = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 7));

  for (let i = 1; i <= totalWeeks; i++) {
    const gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    gridItem.textContent = i;

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
      completedItems.push(Number(item.textContent));
    });
    localStorage.setItem('calendarState', JSON.stringify(completedItems));
  }

  // Add reset button functionality
  document.getElementById('reset-button').addEventListener('click', () => {
    localStorage.removeItem('calendarState');
    document.querySelectorAll('.grid-item.completed').forEach(item => {
      item.classList.remove('completed');
    });
  });
});
