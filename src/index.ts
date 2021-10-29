require('dotenv').config();
import slack from './clients/slack';
import listeners from './listeners';

(async () => {
  await slack.start(Number(process.env.PORT) || 5000);
  listeners.forEach((listen) => listen(slack));
  console.log('⚡️ CYFBot is listening!');
})();
