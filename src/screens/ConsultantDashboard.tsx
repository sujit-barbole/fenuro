import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../api/consultantService';
import UserCard from '../components/UserCard';

export default function ConsultantDashboard({ user }: { user?: any }) {
  const name = user ? user.firstName : 'Consultant';
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchAllUsers();
        // Filter to show only users with role "USER"
        const userRoleUsers = data.filter((u: any) => u.role === 'USER');
        setUsers(userRoleUsers);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  return (
    <div>
      <h2>Welcome, {name}!</h2>
      <div style={{ margin: '2.5rem 0' }}>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e2e8f0', padding: '1.5rem 2rem', marginBottom: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#764ba2', marginBottom: 8 }}>All Users</div>
          {loading ? (
            <div style={{ color: '#718096', fontSize: 16 }}>Loading users...</div>
          ) : error ? (
            <div style={{ color: '#f56565', fontSize: 16 }}>{error}</div>
          ) : users.length === 0 ? (
            <div style={{ color: '#718096', fontSize: 16 }}>No users found.</div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2rem',
              marginTop: 16,
            }}>
              {users.map(u => (
                <UserCard key={u.id} user={u} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 