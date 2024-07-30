"use client";

import { useRef } from "react";

export default function TokenInfo({ tokenInfo }: { tokenInfo: any }) {
  const nearRef = useRef(null);
  const auroraRef = useRef(null);
  const ethereumRef = useRef(null);

  const handleClick = (ref: any) => {
    const range = document.createRange();
    range.selectNode(ref.current);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

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
              <div
                ref={nearRef}
                onClick={() => handleClick(nearRef)}
                className="max-w-full break-all rounded-md bg-[#2b2d3a] p-1 text-xs"
              >
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
              <div
                ref={auroraRef}
                onClick={() => handleClick(auroraRef)}
                className="max-w-full break-all rounded-md bg-[#2b2d3a] p-1 text-xs"
              >
                {tokenInfo.address.aurora}
              </div>
            </div>
          )}
          {tokenInfo.address.ethereum && (
            <div className="flex shrink flex-col">
              <a
                href={`https://etherscan.io/address/${tokenInfo.address.ethereum}`}
                target="_blank"
                title="Etherscan"
              >
                Ethereum ↗
              </a>
              <div
                ref={ethereumRef}
                onClick={() => handleClick(ethereumRef)}
                className="max-w-full break-all rounded-md bg-[#2b2d3a] p-1 text-xs"
              >
                {tokenInfo.address.ethereum}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}
