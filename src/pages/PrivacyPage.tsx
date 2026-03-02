export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>

      <div className="prose prose-invert max-w-none space-y-6 text-slate-300">
        <p>Last updated: January 2025</p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4">Data Collection</h2>
        <p>
          FreelanceCalc.eu does not collect, store, or transmit any personal data.
          All calculations are performed entirely in your browser. Your income figures
          and other inputs are never sent to any server.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4">Cookies</h2>
        <p>
          We do not use cookies for tracking purposes. If we implement preferences
          (like dark mode settings), these are stored locally in your browser
          using localStorage.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4">Analytics</h2>
        <p>
          We may use privacy-focused analytics tools that do not track individual users.
          These tools help us understand general usage patterns to improve the service.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4">Third-Party Services</h2>
        <p>
          This site is hosted on Cloudflare Pages. Please refer to
          Cloudflare's privacy policy for information about their data practices.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4">Contact</h2>
        <p>
          For any privacy-related questions, please contact us at privacy@freelancecalc.eu
        </p>
      </div>
    </div>
  );
}
