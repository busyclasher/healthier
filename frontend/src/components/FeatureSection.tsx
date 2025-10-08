import type { Section } from '../data/featureSections';

type FeatureSectionProps = {
  section: Section;
};

export function FeatureSection({ section }: FeatureSectionProps) {
  return (
    <section className="card" id={section.id}>
      <span className="tag">{section.label}</span>
      <h2>{section.title}</h2>
      <p>{section.summary}</p>
      <ul>
        {section.highlights.map((feature) => (
          <li key={feature.id}>
            <strong>{feature.title}:</strong> {feature.details}
          </li>
        ))}
      </ul>
    </section>
  );
}
