import { app } from './app.js';
import { env } from './env/env.js';

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server running🔥');
  }).catch((error: unknown) => {
    console.log(error)
  });
