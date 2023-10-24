const express = require('express');
require('dotenv').config();
const app = express();

// Routes
const authRoutes = require('./routes/AuthRoutes');
const taskRoutes = require('./routes/TaskRoutes');

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});