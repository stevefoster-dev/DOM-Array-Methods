const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch Random User and add money

async function getRandomUser() {
  const res = await axios.get("https://randomuser.me/api");
  const user = res.data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

// Double Money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Sort Users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Add New Object to Data Array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Filter Millionaires Only
function showMillionaires() {
  data = data.filter((user) => user.money >= 1000000);

  updateDOM();
}

// Calculate Entire Wealth
function calculateWealth() {
  const sum = formatMoney(data.reduce((acc, user) => (acc += user.money), 0));
  const sumEl = document.createElement("div");
  sumEl.innerHTML = `<h3>Total Wealth: <strong>${sum}</strong>`;
  main.appendChild(sumEl);
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main Div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format Number as Money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// EVENT LISTENERS
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
