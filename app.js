import express from 'express';
import bodyParser from 'body-parser';
import routes from './server/routes';
import createTables from './server/models/index';

const port = process.env.PORT || 4000;

// db creation
(async () => {
  try {
    await createTables();
  } catch (e) {
    // throw e;
  }
})().catch((err) => {
  console.log(err);
});

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`connected on port ${port}`);
});

export default app;
