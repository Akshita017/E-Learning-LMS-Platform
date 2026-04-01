import * as cheerio from "cheerio";
import axios from "axios";

const scrapeAmazonProducts = async (searchQuery) => {
  const baseURL = "https://www.amazon.com/s";
  const queryParams = `?k=${encodeURIComponent(searchQuery)}`;

  try {
    const { data } = await axios.get(baseURL + queryParams, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
          "AppleWebKit/537.36 (KHTML, like Gecko) " +
          "Chrome/110.0.0.0 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);
    const products = [];

    $(".s-result-item").each((_, element) => {
      const title = $(element).find("h2 a span").text().trim();
      const link = "https://www.amazon.com" + $(element).find("h2 a").attr("href");
      const thumbnail = $(element).find("img").attr("src") || "/default-thumbnail.jpg";
      const price = $(element).find(".a-price-whole").text().trim() || "N/A";

      if (title && link) {
        products.push({ id: link.split("/")[3], title, thumbnail, price });
      }
    });

    return products;
  } catch (error) {
    console.error("Error scraping Amazon products:", error);
    return [];
  }
};

export default scrapeAmazonProducts;
