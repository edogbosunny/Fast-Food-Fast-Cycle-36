import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
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
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}
app.use('/api/v1', routes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ strict: false }));

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
