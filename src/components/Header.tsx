import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
          FreelanceCalc<span className="text-blue-500">.eu</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-slate-300 hover:text-white transition-colors text-sm">
            Calculator
          </Link>
          <Link to="/compare" className="text-slate-300 hover:text-white transition-colors text-sm">
            Compare
          </Link>
          <Link to="/faq" className="text-slate-300 hover:text-white transition-colors text-sm">
            FAQ
          </Link>
          <Link to="/about" className="text-slate-300 hover:text-white transition-colors text-sm">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
