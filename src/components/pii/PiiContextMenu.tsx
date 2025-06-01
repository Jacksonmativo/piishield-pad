
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Shield, Mail, Phone, MapPin, CreditCard, FileText, Globe, Network, Building, Router } from "lucide-react";

interface PiiContextMenuProps {
  children: React.ReactNode;
  onAnonymize: (piiType: string) => void;
  hasSelection: boolean;
}

export const PiiContextMenu = ({ children, onAnonymize, hasSelection }: PiiContextMenuProps) => {
  const piiOptions = [
    { key: 'name', label: 'Name', icon: Shield },
    { key: 'email', label: 'Email', icon: Mail },
    { key: 'phone', label: 'Phone', icon: Phone },
    { key: 'address', label: 'Address', icon: MapPin },
    { key: 'creditCard', label: 'Credit Card', icon: CreditCard },
    { key: 'ssn', label: 'SSN', icon: FileText },
    { key: 'website', label: 'Website', icon: Globe },
    { key: 'subdomain', label: 'Subdomain', icon: Network },
    { key: 'ipAddress', label: 'IP Address', icon: Router },
    { key: 'company', label: 'Company', icon: Building },
    { key: 'port', label: 'Port', icon: Router }
  ];

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56 bg-black/90 backdrop-blur-md border border-white/20 text-white">
        {hasSelection && (
          <>
            <div className="px-2 py-1.5 text-xs font-medium text-gray-400 border-b border-white/10 mb-1">
              Anonymize as:
            </div>
            {piiOptions.map(({ key, label, icon: Icon }) => (
              <ContextMenuItem
                key={key}
                onClick={() => onAnonymize(key)}
                className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-white/10 focus:bg-white/10 cursor-pointer"
              >
                <Icon className="w-4 h-4" />
                {label}
              </ContextMenuItem>
            ))}
          </>
        )}
        {!hasSelection && (
          <div className="px-2 py-1.5 text-xs text-gray-400">
            Select text to anonymize
          </div>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};
