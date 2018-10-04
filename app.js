import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './server/routes/index';
import createTables from './server/models/index';

const port = process.env.PORT || 4000;

// db creation
(async () => {
  try {
    await createTables();
  } catch (e) {
    console.log(e);
  }
})().catch((err) => {
  console.log(err);
});


const app = express();
app.use(cors());
// middleware
app.use('/api/v1', routes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.raw());

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'succesful',
  });
});

app.listen(port, () => {
  console.log(`connected on port ${port}`);
});

export default app;
