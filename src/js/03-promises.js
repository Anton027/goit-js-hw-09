import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const firstDelay = form.querySelector('[name="delay"]');
const delayStep = form.querySelector('[name="step"]');
const amount = form.querySelector('[name="amount"]');


  // console.log(firstDelay);
  // console.log(delayStep);
  // console.log(amount);

// const  valuesForm = {
//     firstDelay: firstDelay.value,
//     delayStep: delayStep.value,
//     amount: amount.value
// };
  
// console.log('valuesForm', valuesForm);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  for (let index = 0; index < amount.value; index++) {
    createPromise(delayStep.value, firstDelay.value)
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

// form.addEventListener('submit', getValuesform);
// refs.firstDelay.addEventListener('input', (e) => {
//   let valuefirstDelay = 0;
//   valuefirstDelay = e.currentTarget.value;
  
//   console.log(valuefirstDelay);
// });

// console.dir(refs.firstDelay.value);

// for (let index = 0; index < refs.amount.value; index++) {
//   createPromise(index).then(value => value); 
// }

// refs.submitBtn.addEventListener('click', () => {

//   for (let index = 0; index < 10; index++) {
//     createPromise(index, 5000).then(({ position, delay }) => {
//     Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//   }); 
//   }
//   console.log('clikc yet');
// });


// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//   });