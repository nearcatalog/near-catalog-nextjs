import Image from "next/image";

async function fetchCoinGeckoData(platformId: string) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${platformId}`,
    {
      next: {
        revalidate: 30,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  return response.json();
}

const formatNumber = (
  num: number | undefined,
  decimals: number = 8,
  fallback: string = "-",
) => (num !== undefined ? num.toFixed(decimals) : fallback);

const formatLargeNumber = (num: number | undefined, fallback: string = "-") =>
  num !== undefined
    ? num
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : fallback;

export default async function PriceInfo({
  tokenInfo,
  name,
}: {
  tokenInfo: any;
  name: string;
}) {
  if (!tokenInfo?.platform?.coingecko) return null;

  let data;
  try {
    data = await fetchCoinGeckoData(tokenInfo.platform.coingecko);
  } catch (error) {
    console.log(error);
    return (
      <div className="rounded-lg bg-[#1b1d2a] p-4">
        <h3 className="space-x-2 text-xl font-bold text-red-500">
          <i className="bi bi-exclamation-triangle"></i>
          <span>Error fetching data</span>
        </h3>
      </div>
    );
  }

  if (Object.keys(data).length === 0) return <></>;

  const {
    market_data: {
      current_price = {},
      price_change_percentage_24h_in_currency = {},
      ath = {},
      high_24h = {},
      low_24h = {},
      total_volume = {},
      market_cap = {},
      circulating_supply = {},
    } = {},
  } = data;

  const priceChangeClassName =
    (price_change_percentage_24h_in_currency?.usd ?? 0) < 0
      ? "text-red-500"
      : "text-green-500";

  return (
    <div className="rounded-lg bg-[#1b1d2a] p-4">
      <h3 className="text-xl font-bold">{name} Token Status</h3>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 p-2">
          <div className="flex items-center gap-2">
            <Image
              alt={name}
              src={tokenInfo.icon.small}
              className="rounded-full object-cover"
              width={25}
              height={25}
            />
            <span>
              <b>{tokenInfo.symbol}</b>
              <small>/usd</small>
            </span>
          </div>
          <h4 className="text-3xl font-medium">
            ${current_price?.usd ?? " -"}
            <small
              className={`ml-2 text-sm font-medium ${priceChangeClassName}`}
            >
              {formatNumber(
                price_change_percentage_24h_in_currency?.usd,
                2,
                "-",
              )}
              %
            </small>
          </h4>
        </div>
        <div className="flex flex-col flex-wrap gap-4 lg:flex-row">
          {[
            { label: "ATH", value: formatNumber(ath?.usd, 8) },
            { label: "24h high", value: formatNumber(high_24h?.usd, 8) },
            {
              label: "Volume 24h",
              value: formatLargeNumber(total_volume?.usd),
            },
            { label: "24h low", value: formatNumber(low_24h?.usd, 8) },
            { label: "Market Cap", value: formatLargeNumber(market_cap?.usd) },
            {
              label: "Circulating Supply",
              value: formatLargeNumber(circulating_supply),
            },
          ].map((item) => (
            <div className="flex flex-col p-1" key={item.label}>
              <p className="text-sm">{item.label}</p>
              <p
                className={`${item.label === "ATH" ? "text-green-500" : undefined} text-sm font-bold`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <a
          target="_blank"
          style={{ color: "inherit" }}
          rel="nofollow"
          href={`https://www.coingecko.com/en/coins/${tokenInfo.platform.coingecko}`}
        >
          View on CoinGecko ↗
        </a>
      </div>
    </div>
  );
}
