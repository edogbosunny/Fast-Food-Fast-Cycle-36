import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import routes from './server/routes/index';
import createTables from './server/models/index';

const port = process.env.PORT || 4000;

// db creation
(async () => {
  try {
    await createTables();
  } catch (e) {
    // console.log(e);
  }
})().catch((err) => {

});

const app = express();
app.use(cors());
app.use('/api/v1', routes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('UI'));
app.use('/UI', express.static(path.resolve(__dirname, '../../UI/')));

app.get('*', (req, res) => res.status(404).json({
  status: false,
  Data: {
    message: 'Page not Found',
  },
}));
app.post('*', (req, res) => res.status(404).json({
  status: false,
  Data: {
    message: 'Page not Found',
  },
}));

app.listen(port, () => {
  console.log(`connected on port ${port}`);
});

export default app;
