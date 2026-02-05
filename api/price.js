export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.metals.live/v1/spot/gold");
    const data = await response.json();

    const ouncePrice = data[0].price;
    const gramPrice = ouncePrice / 31.1035;

    res.status(200).json({ price: gramPrice.toFixed(2) });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch price" });
  }
}
