import express from 'express';
import logger from './src/utils/logger';
import routes from './src/utils/routes';
import deserializeUser from './src/middleware/deserializeUser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './src/utils/errorHandler';

const port = process.env.PORT || 4000;

const app = express();
app.use(
  cors({
    origin: process.env.ORIGIN,
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
