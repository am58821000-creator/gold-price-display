export default async function handler(req, res) {
  try {
    // 1️⃣ جلب الأسعار العالمية بالدولار
    const response = await fetch("https://data-asg.goldprice.org/dbXRates/USD");
    const data = await response.json();
    const goldOunce = data.items[0].xauPrice;      // الذهب بالأونصة
    const silverOunce = data.items[0].xagPrice;    // الفضة بالأونصة
    const platinumOunce = data.items[0].xptPrice;  // البلاتينيوم بالأونصة

    // 2️⃣ تحويل الأونصة للجرام
    const goldGramUSD = goldOunce / 31.1035;
    const silverGramUSD = silverOunce / 31.1035;
    const platinumGramUSD = platinumOunce / 31.1035;

    // 3️⃣ سعر الصرف من الدولار للدينار الكويتي (تقدر تعدّل حسب البنك)
    const usdToKwd = 0.31; // تقريبياً 1 USD = 0.31 KWD

    // 4️⃣ التحويل للجرام بالدينار الكويتي
    const goldGramKWD = (goldGramUSD * usdToKwd).toFixed(3);
    const silverGramKWD = (silverGramUSD * usdToKwd).toFixed(3);
    const platinumGramKWD = (platinumGramUSD * usdToKwd).toFixed(3);

    res.status(200).json({
      gold: goldGramKWD,
      silver: silverGramKWD,
      platinum: platinumGramKWD
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prices" });
  }
}
