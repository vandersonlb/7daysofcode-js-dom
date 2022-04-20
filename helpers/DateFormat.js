function UStoBR(birthdate) {
  let date = new Date(birthdate.split("-"));
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function BRtoUS(birthdate) {
  let split = birthdate.split("/");
  return `${split[2]}-${split[1]}-${split[0]}`
}

export default {UStoBR,  BRtoUS}