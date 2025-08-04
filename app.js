const express = require('express');
const routes = require('./src/routes/task.route');
const { responseMiddleware } = require('./src/middleware/response.middleware');
const { errorMiddleware } = require('./src/middleware/error.middleware');
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Response Middleware
app.use(responseMiddleware);

// Routes
app.use("/api/v1/tasks", routes);


// Health check endpoint
app.get("/", (req, res) => {
    res.send("Server is up and running....");
});


// Error handling
app.use(errorMiddleware);


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;