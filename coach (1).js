export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { role, task } = req.body || {};

  if (!role || !task) {
    return res.status(400).json({ error: 'Missing role or task' });
  }

  // Basic length guard to keep costs predictable
  if (role.length > 200 || task.length > 500) {
    return res.status(400).json({ error: 'Input too long' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: `You are an AI skills coach helping non-technical professionals use AI tools like Claude to upgrade a specific work task, so they stay relevant and don't fall behind as workplaces adopt AI.

Role: ${role}
Task they're stuck on: ${task}

Respond ONLY with valid JSON, no markdown fences, no preamble, in exactly this shape:
{
  "why_it_matters": "one punchy sentence (under 20 words) tying this specific task to staying relevant/getting ahead at work",
  "steps": ["3 to 4 short steps, each under 20 words, describing the AI-assisted way to do this specific task"],
  "prompts": ["2 to 3 ready-to-copy prompts, each a full realistic prompt a person could paste into Claude for this exact task, 15-40 words each"]
}`
          }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', errText);
      return res.status(502).json({ error: 'Upstream API error' });
    }

    const data = await response.json();
    const raw = data.content.map(b => b.text || '').join('').trim();
    const cleaned = raw.replace(/^```json\s*|^```\s*|```$/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return res.status(200).json(parsed);
  } catch (err) {
    console.error('Coach handler error:', err);
    return res.status(500).json({ error: 'Something went wrong generating your upgrade.' });
  }
}
