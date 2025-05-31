
import { Shield } from "lucide-react";

export const Header = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-r from-[#1F6E8C] via-[#2E8A99] to-[#84A7A1] rounded-xl shadow-lg shadow-[#0E2954]/25">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-[#84A7A1] to-white bg-clip-text text-transparent">
          PII Shield
        </h1>
      </div>
      <p className="text-slate-200 text-lg max-w-2xl mx-auto">
        Anonymize personal information for AI interactions, then restore it in the response.
        Keep your privacy while leveraging AI assistance.
      </p>
    </div>
  );
};
