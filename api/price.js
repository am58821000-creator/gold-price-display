export default async function handler(req, res) {
  try {
    const gold24 = 39.62;
    const gold22 = 36.32;
    const gold21 = 34.67;
    const gold18 = 29.71;
    const silver = 0.24;
    const platinum = 10.12;

    function buySell(price){
      const buy = price;
      const sell = (price * 1.02).toFixed(3);
      return { buy: buy.toFixed(3), sell };
    }

    res.status(200).json({
      gold24: buySell(gold24),
      gold22: buySell(gold22),
      gold21: buySell(gold21),
      gold18: buySell(gold18),
      silver: buySell(silver),
      platinum: buySell(platinum)
    });
  } catch(err) {
    res.status(500).json({ error: "Failed to fetch prices" });
  }
}
