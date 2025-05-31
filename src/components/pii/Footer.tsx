
import { Shield, Lock, Eye, AlertTriangle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-16 bg-gradient-to-r from-[#0b0909] via-[#44444c] to-[#0b0909] text-white border-t border-[#44444c]/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* AI Safety Tips */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-[#d6d6d6]" />
              <h3 className="text-lg font-semibold">AI Safety Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-[#8c8c8c]">
              <li className="flex items-start gap-2">
                <Lock className="w-4 h-4 mt-0.5 text-[#d6d6d6] flex-shrink-0" />
                Always anonymize personal data before sharing with AI
              </li>
              <li className="flex items-start gap-2">
                <Eye className="w-4 h-4 mt-0.5 text-[#d6d6d6] flex-shrink-0" />
                Review all outputs before using them
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 text-[#d6d6d6] flex-shrink-0" />
                Never share sensitive data directly
              </li>
            </ul>
          </div>

          {/* Best Practices */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Best Practices</h3>
            <ul className="space-y-2 text-sm text-[#8c8c8c]">
              <li>• Use unique placeholders for different data types</li>
              <li>• Keep anonymization mappings secure</li>
              <li>• Verify data restoration accuracy</li>
              <li>• Limit AI access to necessary information only</li>
            </ul>
          </div>

          {/* Supported Data Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Protected Data</h3>
            <ul className="space-y-2 text-sm text-[#8c8c8c]">
              <li>• Personal names and identifiers</li>
              <li>• Email addresses and phone numbers</li>
              <li>• Financial and credit card data</li>
              <li>• Website URLs and IP addresses</li>
              <li>• Company domains and subdomains</li>
              <li>• Network ports and technical data</li>
            </ul>
          </div>

          {/* Security Notice */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Security Notice</h3>
            <div className="bg-[#0b0909]/50 p-4 rounded-lg border border-[#d6d6d6]/30 backdrop-blur-sm">
              <p className="text-sm text-[#8c8c8c] leading-relaxed">
                PII Shield helps protect your privacy when interacting with AI systems. 
                Always verify that sensitive information is properly anonymized before 
                sharing with any external service.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#d6d6d6]/30 mt-8 pt-8 text-center">
          <p className="text-sm text-[#8c8c8c]">
            © 2024 PII Shield. Protecting your privacy in AI interactions.
          </p>
        </div>
      </div>
    </footer>
  );
};
