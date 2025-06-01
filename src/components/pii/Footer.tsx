
import { Shield, Lock, Eye, AlertTriangle, Heart } from "lucide-react";
import { FeedbackForm } from "./FeedbackForm";

export const Footer = () => {
  return (
    <footer className="mt-16 bg-black/40 backdrop-blur-md border-t border-white/20 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* AI Safety Tips */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-white" />
              <h3 className="text-lg font-semibold text-white">AI Safety Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <Lock className="w-4 h-4 mt-0.5 flex-shrink-0 text-white" />
                Always anonymize personal data before sharing with AI
              </li>
              <li className="flex items-start gap-2">
                <Eye className="w-4 h-4 mt-0.5 flex-shrink-0 text-white" />
                Review all outputs before using them
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-white" />
                Never share sensitive data directly
              </li>
            </ul>
          </div>

          {/* Best Practices */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Best Practices</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Use unique placeholders for different data types</li>
              <li>• Keep anonymization mappings secure</li>
              <li>• Verify data restoration accuracy</li>
              <li>• Limit AI access to necessary information only</li>
            </ul>
          </div>

          {/* Supported Data Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Protected Data</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Personal names and identifiers</li>
              <li>• Email addresses and phone numbers</li>
              <li>• Financial and credit card data</li>
              <li>• Website URLs and IP addresses</li>
              <li>• Company domains and subdomains</li>
              <li>• Network ports and technical data</li>
            </ul>
          </div>

          {/* Feedback Form */}
          <div>
            <FeedbackForm />
          </div>

          {/* Support & Donation */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support Us</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/20">
                <p className="text-sm leading-relaxed text-gray-300 mb-3">
                  Help us keep PII Shield free and improve privacy protection for everyone.
                </p>
                <a
                  href="https://www.paypal.com/donate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600/80 backdrop-blur-sm text-white rounded hover:bg-blue-600 transition-all shadow-lg border border-blue-500/50"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Donate via PayPal
                </a>
              </div>
              
              <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/20">
                <p className="text-sm leading-relaxed text-gray-300">
                  PII Shield helps protect your privacy when interacting with AI systems. 
                  Always verify that sensitive information is properly anonymized before 
                  sharing with any external service.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm text-white">
            © 2024 PII Shield. Protecting your privacy in AI interactions.
          </p>
        </div>
      </div>
    </footer>
  );
};
