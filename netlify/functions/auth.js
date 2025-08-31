import jwt from "jsonwebtoken";

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const { password } = JSON.parse(event.body);

  if (password === process.env.GAME_PASSWORD) {
    const token = jwt.sign({ access: true }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, token }),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ success: false, message: "Invalid password" }),
  };
}
