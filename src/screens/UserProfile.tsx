import React from 'react';

export default function UserProfile() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isConsultant = user.role === 'CONSULTANT';
  
  return (
    <div style={{ maxWidth: 420, margin: '2rem auto', background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)', borderRadius: 18, boxShadow: '0 8px 32px rgba(60, 72, 88, 0.12)', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 4px 16px rgba(102, 126, 234, 0.15)' }}>
        <span style={{ color: '#fff', fontSize: 36, fontWeight: 700 }}>{user.firstName?.[0] || (isConsultant ? 'C' : 'U')}</span>
      </div>
      <h2 style={{ marginBottom: 8, color: '#2d3748', fontWeight: 700 }}>{user.firstName} {user.lastName}</h2>
      <div style={{ color: '#718096', marginBottom: 24, fontSize: 16 }}>{user.email}</div>
      
      {isConsultant && (
        <div style={{ 
          background: '#fff', 
          borderRadius: 12, 
          padding: '1rem', 
          marginBottom: 16,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ color: '#667eea', fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Consultant</div>
          <div style={{ color: '#718096', fontSize: 14 }}>Debt Settlement Specialist</div>
        </div>
      )}
      
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {isConsultant ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17 }}>
              <span style={{ color: '#64748b', fontWeight: 600 }}>Employee ID:</span>
              <span style={{ color: '#2d3748', fontWeight: 500 }}>{user.id || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17 }}>
              <span style={{ color: '#64748b', fontWeight: 600 }}>Role:</span>
              <span style={{ color: '#2d3748', fontWeight: 500 }}>{user.role || 'CONSULTANT'}</span>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17 }}>
              <span style={{ color: '#64748b', fontWeight: 600 }}>PAN ID:</span>
              <span style={{ color: '#2d3748', fontWeight: 500 }}>{user.panId}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17 }}>
              <span style={{ color: '#64748b', fontWeight: 600 }}>Mobile Number:</span>
              <span style={{ color: '#2d3748', fontWeight: 500 }}>{user.mobileNumber}</span>
            </div>
          </>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17 }}>
          <span style={{ color: '#64748b', fontWeight: 600 }}>Email:</span>
          <span style={{ color: '#2d3748', fontWeight: 500 }}>{user.email}</span>
        </div>
      </div>
    </div>
  );
} 