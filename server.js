const express = require("express"); // Import express
const app = express(); // calls express function and captures return value of it in app variable
const {Restaurant} = require("./models/index") // Import Restaurant model
const {sequelize} = require("./db"); // Import sequelize

const port = 3000; // Set port to 3000

//TODO: Create your GET Request Route Below: 
app.use(express.json()); // use express.json middleware

app.get("/restaurants/:id", async (req, res) => { // async function get request. /restaurants is creating the route name 
    const restaurants = await Restaurant.findByPk(1); // await for restaurants to be found by primary key
    res.json(restaurants); // send restaurants as json
});



app.post("/restaurants", async (req, res) => { // async function post request
    //add a restaurant to the database
    const {name, location, price_range} = req.body; // destructure req.body
    const restaurant = await Restaurant.create({name, location, cuisine}); // await for restaurant to be created
    res.json(restaurant); // send restaurant as json
});

app.put("/restaurants/:id", async (req, res) => { // async function put request
    //update a restaurant in the database
    const {name, location, price_range} = req.body; // destructure req.body
    const restaurant = await Restaurant.update({name, location, cuisine}, {where: {id: req.params.id}}); // await for restaurant to be updated
    res.json(restaurant); // send restaurant as json
});

app.delete("/restaurants/:id", async (req, res) => { // async function delete request
    //delete a restaurant from the database
    const restaurant = await Restaurant.destroy({where: {id: req.params.id}}); // await for restaurant to be destroyed
    res.json(restaurant); // send restaurant as json
});


app.listen(port, () => { // listen on port 3000
    sequelize.sync(); // sync sequelize
    console.log("Your server is listening on port " + port);
})



