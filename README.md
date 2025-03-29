# curl-tweet

A simple HTTP API for posting tweets using Twitter API v2. Deploy to Deno Deploy.

## Setup

1. Clone this repository
2. Get your Twitter API credentials from [X Developer Portal](https://developer.x.com/en/portal/dashboard)
3. Create `.env` file with your Twitter API credentials and app secret:
    ```env
    TWITTER_CONSUMER_KEY=your_consumer_key
    TWITTER_CONSUMER_KEY_SECRET=your_consumer_key_secret
    TWITTER_ACCESS_TOKEN=your_access_token
    TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
    APP_SECRET=your_app_secret # Set any random string value you choose
    ```

- Note: `APP_SECRET` can be any string value you choose (e.g., a random string). Make sure to keep it secure as it will be used to authenticate API requests.
- Note: You can find Twitter API keys in the follwing sections.  
    <img width="600" alt="スクリーンショット 2025-03-29 14 54 04" src="https://github.com/user-attachments/assets/8ca303b8-9875-45b6-bcec-a706363605d4" />

## Deploy

1. Create a new project on [Deno Deploy](https://deno.com/deploy)
2. Add the Twitter API credentials and `APP_SECRET` as environment variables in your project settings
3. Deploy the project with GitHub integration or using `deployctl`

## Usage

Send a POST request to the `/tweet` endpoint with your tweet text and authorization header:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_app_secret" \
  -d '{"text":"Hello!"}' \
  https://your-app.deno.dev/tweet
```
