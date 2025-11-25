// import { apiKey, abc as content } from "./util.js";
// // import apiKey from "./util.js";
// // import * as util from "./util.js";

// // console.log(apiKey);
// // console.log(util.apiKey);
// console.log(content);

// let userMessage = "Hello World!!!";
// const userMessage = "Hello World!!!";

// // console.log("Hellow World!");
// console.log(userMessage);
// console.log(userMessage);

// console.log(10 / 5);
// console.log("hello" + "world");
// console.log(10 == 5);
// console.log(10 > 5);
// if (10 == 10) {
//     console.log("10 is equal to 10");
// }

// function greet() {
//     console.log("Hello");
// }

// greet();
// greet();


// function greetUser(userName, message) {
//     console.log("Hello " + userName);
//     console.log(message);
// }



// greetUser("John", "Welcome to our app!");
// greetUser("Manuel", "Welcome to our app!");

// function createGreeting(userName, message = "Welcome to our app!") {
//     return "Hello " + userName + ", " + message;
// }

// const greeting1 = createGreeting("John");
// console.log(greeting1);

// const greeting2 = createGreeting("Manuel", "Welcome to our app!");
// console.log(greeting2);

// function combine(input1, input2, input3) {
//     return (input1 * input2) / input3;
// }

// // anonymous function
// export default (userName, message) => {
//     console.log("Hello " + userName);
//     console.log(message);
// }

// const userName = "John";
// const userAge = 30;

// const user = {
//     name: userName,
//     age: userAge,
//     greet() {
//         console.log("Hello " + this.name);
//     }
// }

// console.log(user);
// console.log(user.name);
// user.greet();

// class User {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     greet() {
//         console.log("Hello " + this.name);
//     }
// }

// const user1 = new User("John", 30);
// console.log(user1);
// user1.greet();

// const hobbies = ["Sports", "Cooking", "Reading"];
// console.log(hobbies);
// console.log(hobbies[0]);
// console.log(hobbies[1]);
// console.log(hobbies[2]);

// array con contain any type of data

// built in utility methods

// hobbies.push("Swimming");
// console.log(hobbies);

// const index = hobbies.findIndex((hobby) => {
//     return hobby === "Cooking"
// });
// console.log(index);

// const index2 = hobbies.findIndex((hobby) => hobby === "Cooking");
// console.log(index2);

// const hobbies2 = hobbies.map((hobby) => hobby + "!");
// console.log(hobbies2);

// const hobbies3 = hobbies.map((hobby) => ({ text: hobby }));
// console.log(hobbies3);

// function transformToObjects(numberArray) {
//     // Todo: Add your logic
//     // should return an array of objects
//     return numberArray.map((number) => ({ val: number }));
// }

// console.log(transformToObjects([1, 2, 3]));

// destructuring

// const userNameData = ["Max", "Schwarzmuller"];

// const firstName = userNameData[0];
// const lastName = userNameData[1];

// console.log(firstName);
// console.log(lastName);

// const [firstName2, lastName2] = userNameData;
// console.log(firstName2);
// console.log(lastName2);

// objects
const user = {
    name: "Max",
    age: 30,
    greet() {
        console.log("Hello " + this.name);
    }
}

// console.log(user);
// // const name = user.name;
// // const age = user.age;
// // console.log(name);
// // console.log(age);

// // const { name, age } = user;
// // console.log(name);
// // console.log(age);

// const { name: userName, age: userAge } = user;
// console.log(userName);
// console.log(userAge);

// special spread operator

// const hobbies = ["Sports", "Cooking", "Reading"];
// const newHobbies = ["Swimming", "Gaming"];
// const copiedHobbies = [hobbies, newHobbies];
// const copiedHobbies2 = [...hobbies, ...newHobbies];
// console.log(copiedHobbies);
// console.log(copiedHobbies2)

// // objects
// const extendedUser = {
//     isAdmin: true,
//     ...user
// }
// console.log(extendedUser)

// control structures
// if (10 === 10) {
//     console.log("10 is equal to 10");
// } else if (5 === 5) {
//     console.log("5 is equal to 5");
// } else if (2 === 2) {
//     console.log("2 is equal to 2");
// }
// else {
//     console.log("10 is not equal to 10");
// }

// // const password = prompt("Enter your password");
// // if (password === "Hello") {
// //     console.log("Correct password");
// // } else if (password === "hello") {
// //     console.log("Correct password");
// // }
// // else {
// //     console.log("Wrong password");
// // }

// // for loop
// const hobbies = ["Sports", "Cooking", "Reading"];
// for (const hobby of hobbies) {
//     console.log(hobby);
// }

// functions as values
// const list = document.querySelector("ul");
// list.remove();

// defining functiside functions
// function handleTimeout() {
//     console.log("Timeout");
// }
// const handleTimeout2 = () => {
//     console.log("Timeout");
// }
// setTimeout(handleTimeout, 2000);
// setTimeout(handleTimeout2, 2000);
// // no parentheses

// setTimeout(() => {
//     console.log("Timeout");
// }, 2000);

// function greeter(greetFn) {
//     greetFn();
// }

// greeter(() => {
//     console.log("Hello");
// });

// refrence vs primiteive values

let userMessage = "Hello";
userMessage = userMessage.concat("!!!");
// userMessage is primitive value, a new value is created

// objects
const hobbies = ["Sports", "Cooking", "Reading"];
hobbies.push("Swimming");
console.log(hobbies);
// hobbies is reference value, the same object is modified

const message = "Hello";
const message2 = message;
// message is primitive value, a new value is created

