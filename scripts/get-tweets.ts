import * as fs from 'fs';
import * as path from 'path';
import Twit from 'twit';

const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

if (!consumerKey || !consumerSecret) {
  throw new Error('Missing CONSUMER_KEY/CONSUMER_SECRET');
}

const filePath = path.resolve('./tweets.json');
const T = new Twit({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  app_only_auth: true,
  strictSSL: true,
});
const params = {
  screen_name: 'abraham',
  count: 25,
  include_entities: true,
  tweet_mode: 'extended',
  include_rts: false,
  exclude_replies: true,
};
T.get('statuses/user_timeline', params, (error, tweets) => {
  if (error) {
    throw new Error(error);
  } else {
    fs.writeFileSync(filePath, JSON.stringify(tweets.slice(0, 6), null, 2));
  }
});
