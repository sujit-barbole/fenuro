import React from 'react';

const dummyUsers = [
  {
    name: 'John Doe',
    email: 'user@example.com',
    loans: 2,
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    loans: 1,
  },
];

export default function ConsultantDashboard({ user }: { user?: any }) {
  const name = user ? user.firstName : 'Consultant';
  return (
    <div>
      <h2>Welcome, {name}!</h2>
      <div style={{ display: 'flex', gap: '2rem', margin: '2rem 0' }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem 2rem', boxShadow: '0 2px 8px #e2e8f0' }}>
          <div style={{ fontSize: 18, color: '#718096' }}>Assigned Users</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>2</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem 2rem', boxShadow: '0 2px 8px #e2e8f0' }}>
          <div style={{ fontSize: 18, color: '#718096' }}>Total Loans Managed</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>3</div>
        </div>
      </div>
      <h3>Assigned Users</h3>
      <table style={{ width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #e2e8f0', marginTop: 16 }}>
        <thead>
          <tr style={{ background: '#f7fafc', color: '#4a5568' }}>
            <th style={{ padding: '0.75rem' }}>User Name</th>
            <th>Email</th>
            <th>Loans Assigned</th>
          </tr>
        </thead>
        <tbody>
          {dummyUsers.map(user => (
            <tr key={user.email}>
              <td style={{ padding: '0.75rem', textAlign: 'center' }}>{user.name}</td>
              <td style={{ textAlign: 'center' }}>{user.email}</td>
              <td style={{ textAlign: 'center' }}>{user.loans}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 