import { FeatureSection } from '../components/FeatureSection';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { featureSections } from '../data/featureSections';

export function LandingPage() {
  return (
    <>
      <Header />
      <div className="grid">
        {featureSections.map((section) => (
          <FeatureSection key={section.id} section={section} />
        ))}
      </div>
      <Footer />
    </>
  );
}
