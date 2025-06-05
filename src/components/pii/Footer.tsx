
import { Shield, Eye, AlertTriangle, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="mt-16 bg-black/40 backdrop-blur-md border-t border-white/20 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* AI Safety Tips */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-white" />
              <h3 className="text-lg font-semibold text-white">AI Safety Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <Eye className="w-4 h-4 mt-0.5 flex-shrink-0 text-white" />
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
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white">
              © 2025 PII Shield. Protecting your privacy in AI interactions.
            </p>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="bg-yellow-500/20 border-yellow-500/30 text-yellow-100 hover:bg-yellow-500/30 hover:text-yellow-50 transition-colors"
            >
              <a
                href="https://buymeacoffee.com/piishield"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Coffee className="w-4 h-4" />
                Buy me a coffee
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
