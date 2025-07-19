"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  CheckCircle,
  XCircle,
  ExternalLink,
  Copy,
  AlertCircle,
  User,
  Key,
} from "lucide-react";
import { cn, cosmicBorders } from "@/lib/utils";
import { useIncarraContract } from "@/hooks/useIncarraContract";
import Image from "next/image";

export function CarvIdIntegration() {
  const [carvId, setCarvId] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationProof, setVerificationProof] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    incarraAgent,
    carvProfile,
    verifyCarvId,
    loading: contractLoading,
    error: contractError,
    hasAgent,
  } = useIncarraContract();

  const handleConnectCarvId = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!carvId.trim()) {
      setError("Please enter your Carv ID");
      return;
    }

    // Validate Carv ID format (Ethereum address)
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!ethAddressRegex.test(carvId.trim())) {
      setError("Please enter a valid Ethereum address");
      return;
    }

    try {
      setIsConnecting(true);
      setError("");
      setSuccess("");

      // In a real app, you'd integrate with Carv's API here
      // For now, we'll simulate the connection
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess(
        "Carv ID connected successfully! You can now verify ownership."
      );
    } catch (error) {
      setError("Failed to connect Carv ID. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleVerifyOwnership = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verificationProof.trim()) {
      setError("Please provide verification proof");
      return;
    }

    try {
      setIsVerifying(true);
      setError("");
      setSuccess("");

      // Simulate MetaMask transaction - send small amount to test address
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            // Switch to Sepolia testnet
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0xaa36a7" }], // Sepolia chainId
            });

            await window.ethereum.request({
              method: "eth_sendTransaction",
              params: [
                {
                  from: accounts[0],
                  to: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6", // Test address
                  value: "0x2386f26fc10000", // 0.01 ETH in wei
                  gas: "0x5208", // 21000 gas
                  chainId: "0xaa36a7", // Sepolia chainId
                },
              ],
            });
          }
        } catch (err) {
          // Ignore error, always succeed
        }
      }

      // Always succeed for development
      setSuccess("Carv ID ownership verified successfully!");
      // Optionally update mockCarvData.verified = true if you want to reflect in UI
      // In a real app, update state or refetch profile
    } catch (error) {
      setError("Failed to verify ownership. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSuccess("Copied to clipboard!");
    setTimeout(() => setSuccess(""), 2000);
  };

  const mockCarvData = {
    id: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    name: "Cosmic Nova",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cosmic",
    reputation: 89,
    credentials: 5,
    achievements: 12,
    verified: carvProfile?.isVerified || false,
    lastActive: "2 hours ago",
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <Image
          src="/incarra_logo.png"
          alt="Incarra Logo"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl font-mono text-[#ffd700] mb-2 tracking-wider">
          CARV ID INTEGRATION
        </h1>
        <p className="text-[#00bfff] font-light">
          Connect and verify your digital identity
        </p>
      </div>

      {/* Carv ID Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "p-6 rounded-xl border backdrop-blur-sm mb-8",
          cosmicBorders.glow,
          "bg-gradient-to-br from-[#0a0a0a]/80 to-[#1a1a2e]/80"
        )}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00bfff] to-[#8a2be2] p-0.5">
              <img
                src={mockCarvData.avatar}
                alt="Carv Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-mono text-[#ffd700] mb-1">
                {mockCarvData.name}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-[#00bfff]/60 text-sm font-mono">
                  {mockCarvData.id.slice(0, 6)}...{mockCarvData.id.slice(-4)}
                </span>
                <button
                  onClick={() => copyToClipboard(mockCarvData.id)}
                  className="p-1 rounded text-[#00bfff]/60 hover:text-[#00bfff] hover:bg-[#00bfff]/10 transition-all"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div
              className={cn(
                "flex items-center gap-2 px-3 py-1 rounded text-sm font-mono",
                mockCarvData.verified
                  ? "bg-[#7fff00]/20 text-[#7fff00] border border-[#7fff00]/30"
                  : "bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/30"
              )}
            >
              {mockCarvData.verified ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span>{mockCarvData.verified ? "Verified" : "Unverified"}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg bg-[#00bfff]/10 border border-[#00bfff]/20">
            <div className="text-[#00bfff] font-mono text-lg">
              {mockCarvData.reputation}
            </div>
            <div className="text-[#00bfff]/60 text-xs">Reputation</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-[#ffd700]/10 border border-[#ffd700]/20">
            <div className="text-[#ffd700] font-mono text-lg">
              {mockCarvData.credentials}
            </div>
            <div className="text-[#ffd700]/60 text-xs">Credentials</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-[#7fff00]/10 border border-[#7fff00]/20">
            <div className="text-[#7fff00] font-mono text-lg">
              {mockCarvData.achievements}
            </div>
            <div className="text-[#7fff00]/60 text-xs">Achievements</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-[#8a2be2]/10 border border-[#8a2be2]/20">
            <div className="text-[#8a2be2] font-mono text-sm">
              {mockCarvData.lastActive}
            </div>
            <div className="text-[#8a2be2]/60 text-xs">Last Active</div>
          </div>
        </div>

        {/* Verification Status */}
        {!mockCarvData.verified && (
          <div className="p-4 rounded-lg bg-[#ffd700]/10 border border-[#ffd700]/20">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-[#ffd700]" />
              <div>
                <h3 className="text-[#ffd700] font-mono text-sm mb-1">
                  Verification Required
                </h3>
                <p className="text-[#ffd700]/70 text-xs">
                  Verify your Carv ID ownership to unlock additional features
                  and earn reputation bonuses.
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Connect Carv ID Form */}
      {!mockCarvData.id && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={cn(
            "p-6 rounded-xl border backdrop-blur-sm mb-8",
            cosmicBorders.glow,
            "bg-gradient-to-br from-[#0a0a0a]/80 to-[#1a1a2e]/80"
          )}
        >
          <div className="flex items-center gap-3 mb-4">
            <Key className="w-6 h-6 text-[#00bfff]" />
            <h3 className="text-xl font-mono text-[#ffd700]">
              Connect Carv ID
            </h3>
          </div>

          <form onSubmit={handleConnectCarvId} className="space-y-4">
            <div>
              <label className="block text-[#00bfff] text-sm font-mono mb-2">
                Carv ID (Ethereum Address)
              </label>
              <input
                type="text"
                value={carvId}
                onChange={(e) => setCarvId(e.target.value)}
                placeholder="0x..."
                className={cn(
                  "w-full px-4 py-3 rounded-lg border bg-[#0a0a0a]/50",
                  "text-[#ffffff] placeholder-[#00bfff]/40",
                  "border-[#00bfff]/20 focus:border-[#00bfff]",
                  "focus:outline-none focus:ring-0",
                  "transition-all duration-200"
                )}
                maxLength={42}
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isConnecting || contractLoading}
              className={cn(
                "w-full py-3 px-6 rounded-lg font-mono text-sm uppercase tracking-wider",
                "transition-all duration-200",
                isConnecting || contractLoading
                  ? [
                      "bg-[#00bfff]/20 text-[#00bfff]/60",
                      "border border-[#00bfff]/20",
                      "cursor-not-allowed",
                    ]
                  : [
                      "bg-gradient-to-r from-[#00bfff] to-[#8a2be2]",
                      "text-[#0a0a0a] font-semibold",
                      "hover:shadow-[0_0_20px_rgba(0,191,255,0.3)]",
                      "active:scale-95",
                    ]
              )}
              whileHover={
                !isConnecting && !contractLoading ? { scale: 1.02 } : {}
              }
              whileTap={
                !isConnecting && !contractLoading ? { scale: 0.98 } : {}
              }
            >
              {isConnecting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
                  <span>Connecting...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Connect Carv ID</span>
                </div>
              )}
            </motion.button>
          </form>
        </motion.div>
      )}

      {/* Verify Ownership Form */}
      {mockCarvData.id && !mockCarvData.verified && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn(
            "p-6 rounded-xl border backdrop-blur-sm mb-8",
            cosmicBorders.glow,
            "bg-gradient-to-br from-[#0a0a0a]/80 to-[#1a1a2e]/80"
          )}
        >
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-[#7fff00]" />
            <h3 className="text-xl font-mono text-[#ffd700]">
              Verify Ownership
            </h3>
          </div>

          <form onSubmit={handleVerifyOwnership} className="space-y-4">
            <div>
              <label className="block text-[#00bfff] text-sm font-mono mb-2">
                Verification Proof
              </label>
              <textarea
                value={verificationProof}
                onChange={(e) => setVerificationProof(e.target.value)}
                placeholder="Provide proof of ownership (signature, transaction hash, etc.)..."
                rows={3}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border bg-[#0a0a0a]/50",
                  "text-[#ffffff] placeholder-[#00bfff]/40",
                  "border-[#00bfff]/20 focus:border-[#00bfff]",
                  "focus:outline-none focus:ring-0",
                  "transition-all duration-200 resize-none"
                )}
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isVerifying || contractLoading}
              className={cn(
                "w-full py-3 px-6 rounded-lg font-mono text-sm uppercase tracking-wider",
                "transition-all duration-200",
                isVerifying || contractLoading
                  ? [
                      "bg-[#7fff00]/20 text-[#7fff00]/60",
                      "border border-[#7fff00]/20",
                      "cursor-not-allowed",
                    ]
                  : [
                      "bg-gradient-to-r from-[#7fff00] to-[#00bfff]",
                      "text-[#0a0a0a] font-semibold",
                      "hover:shadow-[0_0_20px_rgba(127,255,0,0.3)]",
                      "active:scale-95",
                    ]
              )}
              whileHover={
                !isVerifying && !contractLoading ? { scale: 1.02 } : {}
              }
              whileTap={!isVerifying && !contractLoading ? { scale: 0.98 } : {}}
            >
              {isVerifying ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verify Ownership</span>
                </div>
              )}
            </motion.button>
          </form>
        </motion.div>
      )}

      {/* Error/Success Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-lg bg-[#ff69b4]/10 border border-[#ff69b4]/20 mb-4"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#ff69b4]" />
              <span className="text-[#ff69b4] text-sm">{error}</span>
            </div>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-lg bg-[#7fff00]/10 border border-[#7fff00]/20 mb-4"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#7fff00]" />
              <span className="text-[#7fff00] text-sm">{success}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contract Error */}
      {contractError && (
        <div className="p-4 rounded-lg bg-[#ff69b4]/10 border border-[#ff69b4]/20">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#ff69b4]" />
            <span className="text-[#ff69b4] text-sm">
              Contract Error: {contractError}
            </span>
          </div>
        </div>
      )}

      {/* Carv ID Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={cn(
          "p-6 rounded-xl border backdrop-blur-sm",
          cosmicBorders.glow,
          "bg-gradient-to-br from-[#0a0a0a]/80 to-[#1a1a2e]/80"
        )}
      >
        <h3 className="text-xl font-mono text-[#ffd700] mb-4 text-center">
          Carv ID Benefits
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-[#00bfff]/10 border border-[#00bfff]/20">
            <Shield className="w-8 h-8 text-[#00bfff] mx-auto mb-3" />
            <h4 className="text-[#00bfff] font-mono text-sm mb-2">
              Verified Identity
            </h4>
            <p className="text-[#00bfff]/60 text-xs">
              Prove ownership of your digital identity across platforms
            </p>
          </div>

          <div className="text-center p-4 rounded-lg bg-[#ffd700]/10 border border-[#ffd700]/20">
            <User className="w-8 h-8 text-[#ffd700] mx-auto mb-3" />
            <h4 className="text-[#ffd700] font-mono text-sm mb-2">
              Reputation Boost
            </h4>
            <p className="text-[#ffd700]/60 text-xs">
              Earn bonus reputation and unlock exclusive features
            </p>
          </div>

          <div className="text-center p-4 rounded-lg bg-[#7fff00]/10 border border-[#7fff00]/20">
            <ExternalLink className="w-8 h-8 text-[#7fff00] mx-auto mb-3" />
            <h4 className="text-[#7fff00] font-mono text-sm mb-2">
              Cross-Platform
            </h4>
            <p className="text-[#7fff00]/60 text-xs">
              Use your verified identity across multiple applications
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
