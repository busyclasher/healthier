import { Link } from 'react-router-dom';

type RoleGuardNoticeProps = {
  expectedRole: 'provider' | 'payer';
};

export function RoleGuardNotice({ expectedRole }: RoleGuardNoticeProps) {
  return (
    <div className="panel inline-alert">
      <h2>Authentication Required</h2>
      <p>
        This workspace is tailored for the <strong>{expectedRole}</strong> role. Use the navigation bar to log in as a{' '}
        {expectedRole === 'provider' ? 'clinic partner' : 'payer stakeholder'} and unlock operational views.
      </p>
      <Link to="/">Return to overview</Link>
    </div>
  );
}
