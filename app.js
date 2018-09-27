import express from 'express';
import bodyParser from 'body-parser';
import routes from './server/routes/routes';

const port = process.env.PORT || 4000;
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`connected on port ${port}`);
});

module.exports = app;
