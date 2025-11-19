"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { base } from "wagmi/chains";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export function WalletConnectButton() {
  const { address, isConnected } = useAccount();
  const { connectors, connectAsync, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    if (isConnected) {
      disconnect();
      return;
    }

    const connector = connectors[0];
    if (!connector) return;

    try {
      await connectAsync({
        connector,
        chainId: base.id,
      });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const displayAddress = address
    ? `${address.slice(0, 6)}…${address.slice(-4)}`
    : "Connect Wallet";

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 disabled:bg-blue-600/50 whitespace-nowrap flex-shrink-0"
    >
      <Wallet className="h-3 w-3" />
      <span className="hidden sm:inline">
        {isConnecting ? "Connecting…" : displayAddress}
      </span>
      <span className="sm:hidden">
        {isConnecting ? "…" : "Ξ"}
      </span>
    </Button>
  );
}
