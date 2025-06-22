import { type SmartAccountClient } from "@alchemy/aa-core";
import { useAccount, useWalletClient } from "wagmi";
import { useEffect, useState } from "react";

export const useSmartAccount = () => {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [smartAccountClient, setSmartAccountClient] =
    useState<SmartAccountClient | null>(null);
  const [smartAccountAddress, setSmartAccountAddress] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeSmartAccount = async () => {
      if (!isConnected || !walletClient || !address) {
        setSmartAccountClient(null);
        setSmartAccountAddress(null);
        return;
      }

      try {
        setIsLoading(true);

        // For now, we'll use the regular wallet address
        // In a full implementation, you would create the smart account here
        setSmartAccountAddress(address);

        // TODO: Implement smart account creation with Alchemy
        // This requires proper setup with Alchemy SDK and smart account factory
      } catch (error) {
        console.error("Failed to initialize smart account:", error);
        setSmartAccountClient(null);
        setSmartAccountAddress(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeSmartAccount();
  }, [isConnected, walletClient, address]);

  const sendTransaction = async (
    to: `0x${string}`,
    value: bigint,
    data?: `0x${string}`
  ) => {
    if (!walletClient) {
      throw new Error("Wallet client not initialized");
    }

    try {
      const result = await walletClient.sendTransaction({
        to,
        value,
        data,
      });
      return result;
    } catch (error) {
      console.error("Transaction failed:", error);
      throw error;
    }
  };

  return {
    smartAccountClient,
    smartAccountAddress,
    isLoading,
    sendTransaction,
    isConnected: !!smartAccountClient || isConnected,
  };
};
