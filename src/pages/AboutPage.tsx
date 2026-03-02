import { Link } from 'react-router-dom';
import Disclaimer from '../components/Disclaimer';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">About FreelanceCalc</h1>

      <div className="prose prose-invert max-w-none space-y-6 text-slate-300">
        <p>
          FreelanceCalc.eu is a free tool designed to help freelancers understand their
          tax obligations and estimate their take-home pay across different European countries.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4">Why We Built This</h2>
        <p>
          Moving to a new country as a freelancer can be overwhelming. Tax systems are complex,
          and understanding how much you'll actually take home is crucial for making informed
          decisions. We built this calculator to provide quick, reliable estimates.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4">Countries Covered</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <Link to="/germany" className="text-blue-400 hover:underline">Germany</Link> — Freiberufler tax calculation
          </li>
          <li>
            <Link to="/netherlands" className="text-blue-400 hover:underline">Netherlands</Link> — ZZP'er tax calculation
          </li>
          <li>
            <Link to="/france" className="text-blue-400 hover:underline">France</Link> — Auto-Entrepreneur / Micro-Entreprise
          </li>
          <li>
            <Link to="/spain" className="text-blue-400 hover:underline">Spain</Link> — Autónomo tax calculation
          </li>
          <li>
            <Link to="/portugal" className="text-blue-400 hover:underline">Portugal</Link> — Trabalhador Independente
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4">Accuracy</h2>
        <p>
          Our calculations are based on publicly available tax rates for 2025/2026.
          While we strive for accuracy, actual tax obligations may vary based on your
          specific circumstances. Always consult a qualified tax professional for
          personalized advice.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4">Contact</h2>
        <p>
          Have feedback or found an error? We'd love to hear from you.
          Contact us at hello@freelancecalc.eu
        </p>
      </div>

      <Disclaimer />
    </div>
  );
}
