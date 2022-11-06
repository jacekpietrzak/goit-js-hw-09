import Notiflix from 'notiflix';
const firstDelay = document.querySelector('[name=delay]');
const delayStep = document.querySelector('[name=step]');
const amount = document.querySelector('[name=amount]');
const submitBtn = document.querySelector('[type=submit]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    // Reject
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}

submitBtn.addEventListener('click', event => {
  event.preventDefault();

  for (let i = 0; i <= Number(amount.value) - 1; i += 1) {
    const position = Number([i]) + 1;
    const delayValue = Number(firstDelay.value) + Number(delayStep.value * [i]);
    setTimeout(() => {
      console.log(`delay for promise no ${position}: `, delayValue);
      createPromise(position, delayValue);
    }, delayValue);
  }
});
