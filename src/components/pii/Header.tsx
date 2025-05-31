
import { Shield } from "lucide-react";

export const Header = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="p-3 rounded-xl shadow-lg" style={{ backgroundColor: '#249CFF' }}>
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white">
          PII Shield
        </h1>
      </div>
      <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'darkgray' }}>
        Anonymize personal information for AI interactions, then restore it in the response.
        Keep your privacy while leveraging AI assistance.
      </p>
    </div>
  );
};
