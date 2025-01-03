let base_url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdownSlct = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

//Adding option into dropdown list
for (let select of dropdownSlct) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFag(evt.target);
  });
}

const updateFag = (element) => {
  // console.log(element);
  let currCode = element.value;
  // console.log(currCode);
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  // console.log(amtval);
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }
  // console.log(`${fromCurr.value} ${toCurr.value}`);
  const URL = `${base_url}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  // console.log(rate);
  let finalAmout = amtval * rate;
  msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmout} ${toCurr.value}`;
};

window.addEventListener("load", () => {
  updateExchangeRate();
});
