export default function TokenInfo({ tokenInfo }: { tokenInfo: any }) {
  return (
    (tokenInfo.address.near ||
      tokenInfo.address.aurora ||
      tokenInfo.address.ethereum) && (
      <div className="flex flex-col gap-2 rounded-3xl bg-[#1b1d2a] p-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-base font-bold">Token Contract</h2>
          {tokenInfo.address.near && (
            <div className="flex flex-col">
              <a
                href={`https://nearblocks.io/address/${tokenInfo.address.near}`}
                target="_blank"
                title="NEAR Explorer"
              >
                NEAR Chain (NEP-141) ↗
              </a>
              <div className="overflow-x-auto rounded-md bg-[#2b2d3a] p-1">
                {tokenInfo.address.near}
              </div>
            </div>
          )}
          {tokenInfo.address.aurora && (
            <div className="flex flex-col">
              <a
                href={`https://explorer.aurora.dev/address/${tokenInfo.address.aurora}`}
                target="_blank"
                title="Aurorascan Explorer"
              >
                Aurora ↗
              </a>
              <div className="overflow-x-auto rounded-md bg-[#2b2d3a] p-1">
                {tokenInfo.address.aurora}
              </div>
            </div>
          )}
          {tokenInfo.address.ethereum && (
            <div className="flex flex-col">
              <a
                href={`https://etherscan.io/address/${tokenInfo.address.ethereum}`}
                target="_blank"
                title="Etherscan"
              >
                Ethereum ↗
              </a>
              <div className="overflow-x-auto rounded-md bg-[#2b2d3a] p-1">
                {tokenInfo.address.ethereum}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}
