export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    // In a real app, this would send an email or save to DB.
    console.log(`Received message from ${name} (${email}): ${message}`);
    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
