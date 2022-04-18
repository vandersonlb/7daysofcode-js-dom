const form = document.querySelector('.js-form');

form.onsubmit = (evt) => { 
  evt.preventDefault()
  const {name, birth_date} = form
  console.log(name.value, birth_date.value);
}