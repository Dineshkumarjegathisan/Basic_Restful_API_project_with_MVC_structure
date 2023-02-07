const express = require('express');
const app = express();
const DBconnect = require('./server/DB_connect.js');
const router = require('./router/index.js');
const morgon = require('morgan');


const swaggerJSDoc = require('./swagger/swagger.json');
const swaggerUi = require('swagger-ui-express');

app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));


app.use(express.json());
app.use(morgon(':url:method'));
app.use('/v1', router);//middileware

DBconnect();
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
})