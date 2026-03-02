import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CalculatorPage from './pages/CalculatorPage';
import ComparePage from './pages/ComparePage';
import CountryPage from './pages/CountryPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import FaqPage from './pages/FaqPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CalculatorPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/germany" element={<CountryPage countryCode="DE" />} />
          <Route path="/netherlands" element={<CountryPage countryCode="NL" />} />
          <Route path="/france" element={<CountryPage countryCode="FR" />} />
          <Route path="/spain" element={<CountryPage countryCode="ES" />} />
          <Route path="/portugal" element={<CountryPage countryCode="PT" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/faq" element={<FaqPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
