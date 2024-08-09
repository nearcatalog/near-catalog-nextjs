"use client";

import { useRef } from "react";

type TokenInfoProps = {
  tokenInfo: {
    address: {
      near?: string;
      aurora?: string;
      ethereum?: string;
    };
  };
};

type ChainInfoProps = {
  chainName: string;
  chainTitle: string;
  explorerUrl: string;
  tokenAddress: string;
  refObj: React.RefObject<HTMLDivElement>;
  onClick: (ref: React.RefObject<HTMLDivElement>) => void;
};

function ChainInfo({
  chainName,
  chainTitle,
  explorerUrl,
  tokenAddress,
  refObj,
  onClick,
}: ChainInfoProps) {
  return (
    <div className="flex flex-col">
      <a
        href={explorerUrl}
        target="_blank"
        title={chainTitle}
        rel="noopener noreferrer"
      >
        {chainName} ↗
      </a>
      <div
        ref={refObj}
        onClick={() => onClick(refObj)}
        className="max-w-full break-all rounded-md bg-[#2b2d3a] p-1 text-xs"
      >
        {tokenAddress}
      </div>
    </div>
  );
}

export default function TokenInfo({ tokenInfo }: TokenInfoProps) {
  const nearRef = useRef<HTMLDivElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const ethereumRef = useRef<HTMLDivElement>(null);

  const selectContent = (ref: React.RefObject<HTMLDivElement>) => {
    const range = document.createRange();
    range.selectNode(ref.current!);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const { near, aurora, ethereum } = tokenInfo.address ?? {};

  return (
    (near || aurora || ethereum) && (
      <div className="flex flex-col gap-2 rounded-lg bg-[#1b1d2a] p-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">Token Contract</h3>
          {near && (
            <ChainInfo
              chainName="NEAR Chain (NEP-141)"
              chainTitle="NEAR Explorer"
              explorerUrl={`https://nearblocks.io/address/${near}`}
              tokenAddress={near}
              refObj={nearRef}
              onClick={selectContent}
            />
          )}
          {aurora && (
            <ChainInfo
              chainName="Aurora"
              chainTitle="Aurorascan Explorer"
              explorerUrl={`https://explorer.aurora.dev/address/${aurora}`}
              tokenAddress={aurora}
              refObj={auroraRef}
              onClick={selectContent}
            />
          )}
          {ethereum && (
            <ChainInfo
              chainName="Ethereum"
              chainTitle="Etherscan"
              explorerUrl={`https://etherscan.io/address/${ethereum}`}
              tokenAddress={ethereum}
              refObj={ethereumRef}
              onClick={selectContent}
            />
          )}
        </div>
      </div>
    )
  );
}
