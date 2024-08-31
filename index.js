// function expression

// const { lstat } = require("fs");++++++++++

function getRandomInt() {
  return Math.random(Math.random() * 100);
}

const randomInt = getRandomInt();
console.log(randomInt);

// function declaration

const randominttt = function () {
  return Math.random(Math.random() * 100);
};
console.log(randominttt());

// arrow function
const randomIntt = () => Math.random(Math.random() * 100);
console.log(randomIntt());

const pet = {
  name: "doggo",
  age: 20,
  likes: {
    indoor: "sleep",
    outdoor: "playing fetch",
  },
};

`My name is ${pet.name}, I am ${pet.age} years old and I like to ${pet.likes.indoor} inside and ${pet.likes.outdoor} outside.`;

const {
  name,
  age,
  likes: { indoor, outdoor },
} = pet;

console.log(name, age, indoor, outdoor);

const name1 = (namelkdk) => {
  return namelkdk;
};

console.log(name1(name));

// spread operators

const originalNumbers = { a: 1, b: 2 };
const copiedObject = { ...originalNumbers };

console.log(copiedObject);

let users = [
  { firstName: "ram", lastName: "dhital" },
  { firstName: "ram", lastName: "dhital" },
];
let usernames = users.map(
  (element) => `${element.firstName} ${element.lastName}`
);

console.log(usernames);

console.log(name);
console.log(age);
