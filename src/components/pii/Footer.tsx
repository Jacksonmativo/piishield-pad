
import { Shield, Lock, Eye, AlertTriangle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-16 text-white border-t" style={{ backgroundColor: 'rgba(4, 3, 65, 0.6)', borderColor: '#ccc' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* AI Safety Tips */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5" style={{ color: '#249CFF' }} />
              <h3 className="text-lg font-semibold text-white">AI Safety Tips</h3>
            </div>
            <ul className="space-y-2 text-sm" style={{ color: 'darkgray' }}>
              <li className="flex items-start gap-2">
                <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#249CFF' }} />
                Always anonymize personal data before sharing with AI
              </li>
              <li className="flex items-start gap-2">
                <Eye className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#249CFF' }} />
                Review all outputs before using them
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#249CFF' }} />
                Never share sensitive data directly
              </li>
            </ul>
          </div>

          {/* Best Practices */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Best Practices</h3>
            <ul className="space-y-2 text-sm" style={{ color: 'darkgray' }}>
              <li>• Use unique placeholders for different data types</li>
              <li>• Keep anonymization mappings secure</li>
              <li>• Verify data restoration accuracy</li>
              <li>• Limit AI access to necessary information only</li>
            </ul>
          </div>

          {/* Supported Data Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Protected Data</h3>
            <ul className="space-y-2 text-sm" style={{ color: 'darkgray' }}>
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
            <h3 className="text-lg font-semibold mb-4 text-white">Security Notice</h3>
            <div className="p-4 rounded-lg border shadow-sm" style={{ backgroundColor: '#fafafa', borderColor: '#ccc' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'darkgray' }}>
                PII Shield helps protect your privacy when interacting with AI systems. 
                Always verify that sensitive information is properly anonymized before 
                sharing with any external service.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center" style={{ borderColor: '#ccc' }}>
          <p className="text-sm text-white">
            © 2024 PII Shield. Protecting your privacy in AI interactions.
          </p>
        </div>
      </div>
    </footer>
  );
};
