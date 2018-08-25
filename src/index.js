import express from 'express';
import path from 'path';

import middlewaresConfig from './config/middlewares';
import { HomeRoutes } from './controllers';

const app = express();
const PORT = process.env.PORT || 3001;

/**
 * MIDDLEWARES
 */

middlewaresConfig(app);

/**
 * VIEW ENGINE
 */
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

/**
 * ROUTES
 */
app.use('/', [HomeRoutes]);

// Serve static files
app.use(express.static(path.join(__dirname, "static")));

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log(`Server Running on port: ${PORT}`);
    }
});