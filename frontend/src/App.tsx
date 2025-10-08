import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { FeatureSection } from './components/FeatureSection';
import { featureSections } from './data/featureSections';

function App() {
  return (
    <div className="app-shell">
      <Header />
      <div className="grid">
        {featureSections.map((section) => (
          <FeatureSection key={section.id} section={section} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
