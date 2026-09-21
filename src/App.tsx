import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { VehiclesPage } from '@/pages/VehiclesPage';
import { VehicleDetailPage } from '@/pages/VehicleDetailPage';
import { QuotePage } from '@/pages/QuotePage';
import { HowItWorksPage } from '@/pages/HowItWorksPage';
import { PugliaPage } from '@/pages/PugliaPage';
import { FaqPage } from '@/pages/FaqPage';
import { ContactPage } from '@/pages/ContactPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auto" element={<VehiclesPage />} />
            <Route path="/auto/:id" element={<VehicleDetailPage />} />
            <Route path="/preventivo" element={<QuotePage />} />
            <Route path="/come-funziona" element={<HowItWorksPage />} />
            <Route path="/taranto-puglia" element={<PugliaPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contatti" element={<ContactPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
