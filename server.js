const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

const dataFilePath = path.join(__dirname, 'formData.json');

// Load form data from file if it exists
let formData = {};
if (fs.existsSync(dataFilePath)) {
  formData = JSON.parse(fs.readFileSync(dataFilePath));
}

// Endpoint to get form data
app.get('/api/formData', (req, res) => {
  res.json(formData);
});

// Endpoint to save form data
app.post('/api/formData', (req, res) => {
  formData = req.body;
  fs.writeFileSync(dataFilePath, JSON.stringify(formData, null, 2));
  res.status(200).send('Form data saved successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
