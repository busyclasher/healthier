import { Route, Routes } from 'react-router-dom';

import { AppLayout } from './components/AppLayout';
import { LandingPage } from './routes/LandingPage';
import { PayerWorkspace } from './routes/PayerWorkspace';
import { ProviderWorkspace } from './routes/ProviderWorkspace';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/provider" element={<ProviderWorkspace />} />
        <Route path="/payer" element={<PayerWorkspace />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
