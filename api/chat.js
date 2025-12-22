export default async function handler(req, res) {
  const { message } = req.body;
  // This MUST match the name you typed in Vercel Environment Variables
  const apiKey = process.env.GEMINI_KEY; 

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Engine Failed" });
  }
}

