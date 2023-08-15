const Product = require("../models/citiesModel");
const { getPostData } = require("../utils");

// @Description Gets All Cities
// @route GET /api/cities
async function getCities(req, res) {
  try {
    const cities = await Product.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(cities));
  } catch (error) {
    console.log(error);
  }
}

// @Description Gets City by id
// @route GET /api/city/:id
async function getCity(req, res, id) {
  try {
    const city = await Product.findById(id);

    if (!city) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "City not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(city));
    }
  } catch (error) {
    console.log(error);
  }
}

// @Description Create a city
// @route POST /api/cities
async function createCity(req, res) {
  try {
    const body = await getPostData(req);

    const { cityName, country, emoji, date, notes, position } =
      JSON.parse(body);
    const city = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position,
    };
    const newCity = await Product.create(city);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newCity));
  } catch (error) {
    console.log(error);
  }
}

// @Description Update a city
// @route POST /api/cities/:id
async function updateCity(req, res, id) {
  try {
    const city = await Product.findById(id);

    if (!city) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "City Not Found" }));
    } else {
      const body = await getPostData(req);

      const { cityName, country, emoji, date, notes, position } =
        JSON.parse(body);
      const cityData = {
        cityName: cityName || city.cityName,
        country: country || city.countryName,
        emoji: emoji || city.emoji,
        date: date || city.date,
        notes: notes || city.notes,
        position: position || city.position,
        id: id || city.id,
      };

      const updatedCity = await Product.update(id, cityData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updatedCity));
    }
  } catch (error) {
    console.log(error);
  }
}

// @Description Delete City
// @route DELETE /api/city/:id
async function deleteCity(req, res, id) {
  try {
    const city = await Product.findById(id);

    if (!city) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "City not found" }));
    } else {
      await Product.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `City ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getCities,
  getCity,
  createCity,
  updateCity,
  deleteCity,
};
