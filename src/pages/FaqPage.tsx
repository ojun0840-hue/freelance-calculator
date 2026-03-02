import { useState } from 'react';
import Disclaimer from '../components/Disclaimer';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'How accurate are these calculations?',
    answer: 'Our calculations are based on official tax rates and are designed to give you a reliable estimate. However, individual circumstances can affect your actual tax burden. We recommend using these figures for planning purposes and consulting a tax professional for precise calculations.',
  },
  {
    question: 'Are business expenses deductible?',
    answer: 'Yes, in most countries you can deduct legitimate business expenses from your taxable income. This includes things like equipment, software, home office costs, and professional services. The specific rules vary by country.',
  },
  {
    question: 'What about VAT/IVA/TVA?',
    answer: 'This calculator focuses on income tax and social security contributions. VAT is a separate matter — you generally charge it to clients and remit it to the government. Many countries have VAT exemption thresholds for small businesses.',
  },
  {
    question: 'Do I need to make quarterly payments?',
    answer: 'Most European countries require freelancers to make advance tax payments throughout the year. For example, Spain requires quarterly payments (Modelo 130), Germany may require advance payments based on your previous year\'s income, and France requires monthly or quarterly social charge payments.',
  },
  {
    question: 'What\'s the difference between Freiberufler and Gewerbetreibende in Germany?',
    answer: 'Freiberufler (liberal professionals) like consultants, designers, and developers are exempt from trade tax (Gewerbesteuer). Gewerbetreibende (commercial traders) must pay trade tax on top of income tax. This calculator assumes Freiberufler status.',
  },
  {
    question: 'Can I use multiple tax regimes in France?',
    answer: 'As a Micro-Entrepreneur, you\'re limited to one simplified regime. If your revenue exceeds €77,700 (for services), you\'ll need to switch to the standard regime. The versement libératoire option is only available if your household income meets certain thresholds.',
  },
  {
    question: 'What is the Dutch urencriterium (hours criterion)?',
    answer: 'To qualify for the self-employment deduction (zelfstandigenaftrek) in the Netherlands, you must work at least 1,225 hours per year as a freelancer. This roughly equals 24 hours per week. Without meeting this criterion, you lose access to significant tax deductions.',
  },
  {
    question: 'Is health insurance included in these calculations?',
    answer: 'Yes! Health insurance contributions are included in the breakdown. In Germany, freelancers pay the full health insurance premium (no employer share). In the Netherlands, there\'s both an income-dependent contribution and a basic health insurance premium.',
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-700/50 transition-colors"
            >
              <span className="font-medium text-white">{faq.question}</span>
              <svg
                className={`w-5 h-5 text-slate-400 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-slate-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <Disclaimer />
    </div>
  );
}
