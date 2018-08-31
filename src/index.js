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

// $ curl http://localhost:3000/notfound
// $ curl http://localhost:3000/notfound -H "Accept: application/json"
// $ curl http://localhost:3000/notfound -H "Accept: text/plain"
app.use(function (req, res, next) {
    res.status(404);
    
    res.format({
        html: function () {
            res.render('pages/404', {
                url: req.url
            })
        },
        json: function () {
            res.json({
                error: 'Not found'
            })
        },
        default: function () {
            res.type('txt').send('Not found')
        }
    })
});

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server Running on port: ${PORT}`);
    }
});