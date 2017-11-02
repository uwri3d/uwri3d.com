import express from 'express';
import config from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import Logger from '../middleware/logger';
import Auth from '../middleware/auth';
import Data from '../data';

class App {
  instance;

  port;

  server;

  logger;

  auth;

  data;


  constructor() {
    if (this.instance !== undefined) {
      return this.instance;
    }

    config.config();
    this.port = process.env.PORT;
    const production = (process.env.NODE_ENV === 'production');
    const dbURI = process.env.DB_URI;
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiry = process.env.JWT_EXPIRY;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    this.server = express();

    // this.server.use(helmet());

    this.server.use(cors({origin: true, credentials: true}));

    this.logger = new Logger(production);
    this.server.use(this.logger.log());

    this.auth = new Auth(jwtSecret, jwtExpiry);
    this.server.use(this.auth.protectAllRoutesExcept([
      '/api/signIn', '/api/signUp', '/api/verify',
    ]));
    this.server.use(this.auth.handleAuthErrors());
    this.server.use('/api/signIn', this.auth.handleAuthRequests());
    this.server.use('/api/signUp', this.auth.handleAuthNew());
    this.server.use('/api/verify', this.auth.handleAuthVerify());

    this.data = new Data(production, dbURI);
    this.server.use('/api/getAccount', this.data.handleGetAccount());
    this.server.use('/api/updateAccount', this.data.handleUpdateAccount());

    this.instance = this;
    Object.freeze(this.instance);
  }

  start() {
    this.server.listen(this.port);
  }
}

export default App;