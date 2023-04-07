import Notiflix from "notiflix";

const inputForm = document.querySelector('form');
inputForm.addEventListener('submit', submitBtnHandler);

function submitBtnHandler(event) {
  event.preventDefault();

  const formElements = event.currentTarget.elements;

  let delay = parseInt(formElements.delay.value);
  const step = parseInt(formElements.step.value);
  let amount = parseInt(formElements.amount.value);
  
  for (let position = 1; position <= amount; position += 1){
    createPromise(position, delay)
    .then(({position, delay}) =>{
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({position, delay}) =>{
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay += step;
  }

}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const formData = { position, delay };

  return new Promise((resolve, reject) =>{
    setTimeout(() =>{
      if(shouldResolve) {
        resolve(formData);
      }
      else{
        reject(formData);
      }
    }, delay);
  })
}