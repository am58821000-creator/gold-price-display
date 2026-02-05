export default async function handler(req, res) {
  try {
    const response = await fetch("https://kuwait-gold-rate.com/");
    const html = await response.text();

    const match = html.match(/سعر جرام الذهب عيار 24\s*\D*(\d+\.\d+)/);

    if (!match) {
      return res.status(500).json({ error: "Price not found" });
    }

    res.status(200).json({ price: match[1] });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch price" });
  }
}
