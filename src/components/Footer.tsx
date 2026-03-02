import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-800 border-t border-slate-700 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-400 text-sm">
            Based on 2025/2026 tax rates. Not tax advice.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm">
              Privacy
            </Link>
            <Link to="/about" className="text-slate-400 hover:text-white transition-colors text-sm">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
