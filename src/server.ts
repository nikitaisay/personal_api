import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import contentfulRouter from './routes/contentful';

const app = express();

app.use(bodyParser.json());
app.use('/contentful', contentfulRouter);

app.listen(8000);
