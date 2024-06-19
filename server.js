// 1

const express = require('express');
const app = express();


app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    const greetingMessage = (username === "Miguel");
    res.send(`Hello there, ${username}!`);
});

// 2

app.get('/roll/:number', (req, res) => {
    const numberParam = req.params.number;
    const maxNumber = parseInt(numberParam, 10);

    // Validation: Check if the parameter is a valid number
    if (isNaN(maxNumber)) {
        return res.status(400).send('You must specify a number.');
    }
    const rolledNumber = Math.floor(Math.random() * (maxNumber + 1));
    res.status(200).send(`You rolled a ${rolledNumber}.`);
});

 
//3
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        return res.status(404).send('This item is not yet in stock. Check back soon!');
    }
    const item = collectibles[index];
    res.status(200).send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
});



// 4

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    const { min_price, max_price, type } = req.query;
    let filteredShoes = shoes;

    // Filter by minimum price
    if (min_price) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(min_price));
    }

    // Filter by maximum price
    if (max_price) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(max_price));
    }

    // Filter by type
    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }

    res.json(filteredShoes);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
















//2.
app.get('/roll/:number', (req, res) => {
    const number = req.params.number;
    // Check if the parameter is a valid number
    if (!isValidNumber(number)) {
        res.send("You must specify a number.");
    } else {
        // Convert the number parameter to an integer
        const maxNumber = Number(number);
        // Generate a random whole number between 0 and the given number
        const randomNumber = Math.floor(Math.random() * (maxNumber + 1));
        res.send(`You rolled a ${randomNumber}.`);
    }
});
// Function to validate if a string is a valid number
function isValidNumber(value) {
    // Check if the value is a non-empty string and can be converted to a number
    return !isNaN(value) && value.trim() !== '' && Number.isInteger(Number(value));
}

//3
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        return res.status(404).send('This item is not yet in stock. Check back soon!');
    }
    const item = collectibles[index];
    res.status(200).send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
});


//4.
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];
// Route handler for /shoes
app.get('/shoes', (req, res) => {
    let filteredShoes = [...shoes]; // Start with a copy of the original array
    // Filter by min-price query parameter
    if (req.query['min-price']) {
        const minPrice = parseInt(req.query['min-price']);
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }
    // Filter by max-price query parameter
    if (req.query['max-price']) {
        const maxPrice = parseInt(req.query['max-price']);
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }
    // Filter by type query parameter
    if (req.query.type) {
        const type = req.query.type.toLowerCase(); // Convert to lowercase for case-insensitive comparison
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }
 
    let response = '';
    if (filteredShoes.length === 0) {
        response = 'No shoes match the specified criteria.';
    } else {
        response = 'Filtered Shoes:\n\n';
        filteredShoes.forEach((shoe, index) => {
            response += `Name: ${shoe.name}\nPrice: ${shoe.price}\nType: ${shoe.type}\n\n`;
        });
    }
    res.send(response);
});
app.listen(3000, () => {
    console.log('Listening on port 3000')
});