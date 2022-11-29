import express from 'express';
import config from 'config';
import logger from './utils/logger';
import routes from './utils/routes';
import deserializeUser from './middleware/deserializeUser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './utils/errorHandler';

const port = config.get<number>('port');

const app = express();
app.use(
  cors({
    origin: config.get('origin'),
    credentials: true,
  })
);

app.use(express.static('build'));
app.use(cookieParser());

app.use(express.json());

app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  routes(app);
  app.use(errorHandler);
});

// Create a get current user route
