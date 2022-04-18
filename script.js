const form = document.querySelector('.js-form');

form.onsubmit = (evt) => { 
  evt.preventDefault()
  const {name, birth_date} = form
  console.log(name.value, birth_date.value);
}

(function handleValidity() {
  let inputs = form.querySelectorAll("input")
  
  inputs.forEach(input => {
    input.oninvalid = () => {
      input.setCustomValidity("");
      if (!input.validity.valid)
        input.setCustomValidity(input.title);
    }
  })
})()
