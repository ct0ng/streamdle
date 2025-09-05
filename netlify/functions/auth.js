import jwt from "jsonwebtoken";

export async function handler(event, context) {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: JSON.stringify({ message: "CORS preflight" })
    };
  }

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    // Safe JSON parsing
    const { password } = JSON.parse(event.body);

    // Basic validation
    if (!password || typeof password !== "string") {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ success: false, message: "Password is required" })
      };
    }

    // Check password
    if (password === process.env.GAME_PASSWORD) {
      const token = jwt.sign({ access: true }, process.env.JWT_SECRET, { expiresIn: "1h" });
      return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ success: true, token })
      };
    }

    return {
      statusCode: 401,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: false, message: "Invalid password" })
    };

  } catch (error) {
    console.error("Auth error:", error.message);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: false, message: "Internal server error" })
    };
  }
}
