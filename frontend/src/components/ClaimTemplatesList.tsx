import type { ClaimTemplate } from '../lib/api';

type ClaimTemplatesListProps = {
  templates: ClaimTemplate[];
};

export function ClaimTemplatesList({ templates }: ClaimTemplatesListProps) {
  if (!templates.length) {
    return <p>No templates configured yet. Add baseline bundles to unlock automated claim generation.</p>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Program ID</th>
          <th>Description</th>
          <th>Evidence Signals</th>
        </tr>
      </thead>
      <tbody>
        {templates.map((template) => (
          <tr key={template.id}>
            <td>{template.id}</td>
            <td>{template.description}</td>
            <td>{template.evidence.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
