import { tweet } from "./tweet.ts";

Deno.serve(async (req: Request) => {
  if (req.method !== "POST" || new URL(req.url).pathname !== "/tweet") {
    return new Response(
      'Usage: curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer your-secret" -d \'{"text":"Hello!"}\' https://your-app.deno.dev/tweet',
      { status: 404 }
    );
  }

  const appSecret = Deno.env.get("APP_SECRET");
  if (!appSecret) {
    throw new Error("APP_SECRET is not set");
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response("Forbidden", { status: 403 });
  }

  const token = authHeader.slice(7); // Remove "Bearer " prefix
  if (token !== appSecret) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const body = await req.json();
    if (typeof body.text !== "string") {
      return new Response("Bad Request: text field must be a string", {
        status: 400,
      });
    }

    await tweet(body.text);
    return new Response("OK", { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Internal Server Error", { status: 500 });
  }
});
