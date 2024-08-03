import Image from "next/image";

async function getPriceData(tokenInfo: any) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${tokenInfo.platform.coingecko}`,
    { cache: "no-cache" },
  );
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching price data: ${error}`);
  }
}

export default async function PriceInfo({
  tokenInfo,
  name,
}: {
  tokenInfo: any;
  name: string;
}) {
  if (!tokenInfo?.platform?.coingecko) {
    return "";
  }
  const data = await getPriceData(tokenInfo);

  if (Object.keys(data).length === 0) {
    return <></>;
  }
  return (
    <div className="mb-4 rounded-3xl bg-[#1b1d2a] p-4">
      {data !== null ? (
        <div>
          <h3 className="text-base font-bold">{name} Token Status</h3>
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
                <b>{tokenInfo.symbol}</b>/usd
              </div>
              <h4 className="text-3xl font-bold">
                $
                {data.market_data?.current_price?.usd
                  ? data.market_data?.current_price?.usd
                  : " -"}
                <small
                  className={`+ text-sm font-medium ${
                    data.market_data?.price_change_percentage_24h_in_currency
                      ?.usd < 0
                      ? "text-red-500"
                      : "text-green-500"
                  } `}
                >
                  {data.market_data?.price_change_percentage_24h_in_currency
                    ?.usd
                    ? data.market_data?.price_change_percentage_24h_in_currency?.usd.toFixed(
                        2,
                      )
                    : "-"}
                  %
                </small>
              </h4>
            </div>
            <div className="flex flex-col flex-wrap gap-4 p-2 sm:flex-row">
              <div className="max-w-1/2 flex-grow basis-0 overflow-hidden text-ellipsis">
                ATH
                <p className="text-green-500">
                  $
                  {data?.market_data?.ath.usd
                    ? data?.market_data?.ath.usd.toFixed(8)
                    : " -"}
                </p>
              </div>
              <div className="max-w-1/2 flex-grow basis-0">
                24h high
                <p>
                  <b>
                    $
                    {data?.market_data?.high_24h.usd
                      ? data?.market_data?.high_24h.usd.toFixed(8)
                      : " -"}
                  </b>
                </p>
              </div>
              <div className="max-w-1/2 flex-grow basis-0">
                Volume 24h
                <p>
                  <b>
                    {"$" + data.market_data?.total_volume?.usd
                      ? data.market_data?.total_volume?.usd
                          .toFixed(0)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : " -"}
                  </b>
                </p>
              </div>
              <div className="max-w-1/2 flex-grow basis-0">
                24h low
                <p>
                  <b>
                    $
                    {data.market_data?.low_24h?.usd
                      ? data.market_data?.low_24h?.usd.toFixed(8)
                      : " -"}
                  </b>
                </p>
              </div>
              <div className="max-w-1/2 flex-grow basis-0">
                Market Cap
                <p>
                  <b>
                    {data.market_data?.market_cap?.usd
                      ? "$" +
                        data.market_data?.market_cap.usd
                          .toFixed(0)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : " -"}
                  </b>
                </p>
              </div>
              <div className="max-w-1/2 flex-grow basis-0">
                Circulating Supply
                <p>
                  <b>
                    {data.market_data?.circulating_supply
                      ? data.market_data?.circulating_supply
                          .toFixed(0)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : "-"}
                  </b>
                </p>
              </div>
            </div>
          </div>
          <div>
            <a
              target="_blank"
              style={{ color: "inherit" }}
              rel="nofollow"
              href={
                `https://www.coingecko.com/en/coins/` +
                tokenInfo.platform.coingecko
              }
            >
              View on CoinGecko
            </a>
          </div>
        </div>
      ) : (
        <div> {data.error ? data.error : "Loading ..."} </div>
      )}
    </div>
  );
}
