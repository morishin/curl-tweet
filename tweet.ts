import { TwitterApi } from "npm:twitter-api-v2@1.18.1";

const env = () => {
  const appKey = Deno.env.get("TWITTER_CONSUMER_KEY");
  const appSecret = Deno.env.get("TWITTER_CONSUMER_KEY_SECRET");
  const accessToken = Deno.env.get("TWITTER_ACCESS_TOKEN");
  const accessSecret = Deno.env.get("TWITTER_ACCESS_TOKEN_SECRET");
  if (!appKey || !appSecret || !accessToken || !accessSecret) {
    throw new Error("Missing Twitter API keys");
  }

  return {
    appKey,
    appSecret,
    accessToken,
    accessSecret,
  };
};

export const tweet = async (text: string) => {
  const { appKey, appSecret, accessToken, accessSecret } = env();

  const twitter = new TwitterApi({
    appKey,
    appSecret,
    accessToken,
    accessSecret,
  });

  const res = await twitter.readWrite.v2.tweet(text);
  if (res.errors) {
    console.error(JSON.stringify(res.errors, null, 2));
    throw new Error("Failed to tweet");
  }
};
