const http = require("http");
const {
  getCities,
  getCity,
  createCity,
  updateCity,
  deleteCity,
} = require("./controllers/citiesController");

const server = http.createServer((req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin : https://parus-worldwise.netlify.app"
  );
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }
  if (req.url === "/api/cities" && req.method === "GET") {
    getCities(req, res);
  } else if (req.url.match(/\/api\/cities\/(\d+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getCity(req, res, id);
  } else if (req.url === "/api/cities" && req.method === "POST") {
    createCity(req, res);
  } else if (req.url.match(/\/api\/cities\/(\d+)/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    console.log(updateCity);
    updateCity(req, res, id);
  } else if (req.url.match(/\/api\/cities\/(\d+)/) && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    deleteCity(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Page not found" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
