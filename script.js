document.addEventListener('DOMContentLoaded', (event) => {
  const gridContainer = document.getElementById('calendar');
  const totalWeeks = 4576;

  // Load saved state from localStorage
  const savedState = JSON.parse(localStorage.getItem('calendarState')) || [];

  for (let i = 1; i <= totalWeeks; i++) {
    const gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    gridItem.textContent = i;

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
});
