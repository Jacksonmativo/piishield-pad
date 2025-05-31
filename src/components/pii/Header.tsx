
import { Shield } from "lucide-react";

export const Header = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-r from-[#44444c] via-[#8c8c8c] to-[#d6d6d6] rounded-xl shadow-lg shadow-[#0b0909]/25 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#44444c] via-[#8c8c8c] to-[#d6d6d6] rounded-xl blur opacity-75 animate-pulse"></div>
          <Shield className="w-8 h-8 text-white relative z-10" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-[#d6d6d6] to-white bg-clip-text text-transparent">
          PII Shield
        </h1>
      </div>
      <p className="text-[#d6d6d6] text-lg max-w-2xl mx-auto leading-relaxed">
        Anonymize personal information for AI interactions, then restore it in the response.
        Keep your privacy while leveraging AI assistance.
      </p>
    </div>
  );
};
