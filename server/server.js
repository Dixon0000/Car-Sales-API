const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Sample data
const cars = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: '2019',
    imageURL: 'https://example.com/toyota_camry.jpg',
  },
  {
    id: 2,
    make: 'Honda',
    model: 'Civic',
    year: '2018',
    imageURL: 'https://example.com/honda_civic.jpg',
  },
];

// API endpoint to fetch car details
app.get('/api/cars', (req, res) => {
  res.json(cars);
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
