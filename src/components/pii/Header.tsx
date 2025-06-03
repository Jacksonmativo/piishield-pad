
export const Header = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
          <img 
            src="/lovable-uploads/8edeb822-a464-487a-bab5-eca7566f25b3.png" 
            alt="PII Shield Logo" 
            className="w-8 h-8"
          />
        </div>
        <h1 className="text-4xl font-bold text-white">
          PII Shield
        </h1>
      </div>
      <p className="text-lg max-w-2xl mx-auto leading-relaxed text-gray-300">
        Anonymize personal information for AI interactions, then restore it in the response.
        Keep your privacy while leveraging AI assistance.
      </p>
    </div>
  );
};
