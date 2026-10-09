const boostBtn = document.getElementById('boostBtn');
const performanceScore = document.getElementById('performanceScore');

const states = [96, 98, 100, 99, 97, 96];
let index = 0;

boostBtn.addEventListener('click', () => {
  boostBtn.textContent = 'Boosting...';
  boostBtn.disabled = true;

  const cycle = () => {
    index = (index + 1) % states.length;
    performanceScore.textContent = states[index];

    if (index < states.length - 1) {
      setTimeout(cycle, 250);
    } else {
      setTimeout(() => {
        boostBtn.textContent = 'Boost now';
        boostBtn.disabled = false;
      }, 300);
    }
  };

  cycle();
});
