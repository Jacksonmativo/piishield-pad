
import { Shield } from "lucide-react";

export const Header = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg shadow-purple-500/25">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          PII Shield
        </h1>
      </div>
      <p className="text-slate-300 text-lg max-w-2xl mx-auto">
        Anonymize personal information for AI interactions, then restore it in the response.
        Keep your privacy while leveraging AI assistance.
      </p>
    </div>
  );
};
