let { cities } = require("../data/db.json");
const { v4: uuidv4 } = require("uuid");

const { writeDataToFile } = require("../utils");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(cities);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const city = cities.find((city) => {
      return city.id === parseInt(id);
    });

    resolve(city);
  });
}

function create(city) {
  return new Promise((resolve, reject) => {
    const newCity = { ...city, id: uuidv4() };
    cities.push(newCity);
    writeDataToFile("./data/db.json", { cities });
    resolve(newCity);
  });
}

function update(id, cityData) {
  return new Promise((resolve, reject) => {
    const index = cities.findIndex((city) => {
      return parseInt(id) === parseInt(city.id);
    });
    console.log(index);
    cities[index] = { ...cityData };
    writeDataToFile("./data/db.json", { cities });
    resolve(cities[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    cities = cities.filter((city) => city.id !== parseInt(id));
    writeDataToFile("./data/db.json", { cities });
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
