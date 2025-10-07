import app from './app';
import { AppDataSource } from './data-source';
import dotenv from 'dotenv';
dotenv.config();

const PORT = Number(process.env.PORT || 4000);

AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source initialized');
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
    process.exit(1);
  });
