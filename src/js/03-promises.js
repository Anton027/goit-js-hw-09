import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const firstDelay = form.querySelector('[name="delay"]');
const delayStep = form.querySelector('[name="step"]');
const amount = form.querySelector('[name="amount"]');
// ЗАПУСТИТИ В ЦИКЛІ ПРОМІСИ
// ПЕРЕДАТИ DELAY НА КОЖНІЙ ІТЕРАЦІЇ for + те що у формі зібрали

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let numbFirstDelay = Number.parseInt(firstDelay.value);
  const numbDelayStep = Number.parseInt(delayStep.value);

  for (let index = 1; index <= amount.value; index += 1) {
    numbFirstDelay += numbDelayStep;
    createPromise(index, numbFirstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }); 
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay)
  });
}