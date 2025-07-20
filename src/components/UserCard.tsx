import React, { useState } from 'react';
import { changeUserStatus } from '../api/userService';
import { apiConfig } from '../api/apiConfig';

const steps = [
  'Registration Completed',
  'Requested Initial Consultation',
  'Initial Consultation Completed',
  'Intent for Debt Settlement',
  'Documents Uploaded',
  'Communicated with Bank',
  'Received Bank Response',
  'Final Response Communicated',
  'Payment Completed',
  'Settlement Completed',
];

const statusToStep: { [key: string]: number } = {
  REGISTRATION_COMPLETED: 1,
  REQUESTED_INITIAL_CONSULTATION: 2,
  INITIAL_CONSULTATION_COMPLETED: 3,
  INTENT_FOR_DEBT_SETTLEMENT: 4,
  DOCUMENTS_UPLOADED: 5,
  COMMUNICATED_WITH_BANK: 6,
  RECEIVED_BANK_RESPONSE: 7,
  FINAL_RESPONSE_COMMUNICATED: 8,
  PAYMENT_COMPLETED: 9,
  SETTLEMENT_COMPLETED: 10,
};

function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="stepper-scroll-wrapper" style={{ overflowX: 'auto', marginBottom: 24 }}>
      <div className="stepper" style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {steps.map((step, idx) => (
          <React.Fragment key={step}>
            <div className={`stepper-step${idx + 1 <= currentStep ? ' active' : ''}${idx + 1 === currentStep ? ' current' : ''}`}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80 }}>
              <div className="stepper-circle" style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: idx + 1 <= currentStep ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e2e8f0',
                color: idx + 1 <= currentStep ? '#fff' : '#a0aec0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 16,
                marginBottom: 4,
              }}>{idx + 1}</div>
              <div className="stepper-label" style={{ fontSize: 12, color: idx + 1 <= currentStep ? '#764ba2' : '#a0aec0', textAlign: 'center', maxWidth: 80 }}>{step}</div>
            </div>
            {idx < steps.length - 1 && (
              <div className={`stepper-connector${idx + 1 < currentStep ? ' active' : ''}`}
                style={{ flex: 1, height: 2, background: idx + 1 < currentStep ? 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' : '#e2e8f0', margin: '0 2px' }}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function UserCard({ user }: { user: any }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(user);
  const [bankResponseFile, setBankResponseFile] = useState<File | null>(null);
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [documents, setDocuments] = useState<any>(null);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const currentStep = statusToStep[currentUser.userState] ?? 1;

  async function fetchLatestUserData() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiConfig.baseURL}/auth/user/${user.id}`, {
        method: 'GET',
        headers: apiConfig.headers,
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      setCurrentUser(userData);
      setShowModal(true);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user data');
      // Still show modal with existing data if fetch fails
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  }

  async function fetchUserDocuments() {
    setDocumentsLoading(true);
    try {
      const response = await fetch(`${apiConfig.baseURL}/documents/${currentUser.id}`, {
        method: 'GET',
        headers: apiConfig.headers,
      });
      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }
      const documentsData = await response.json();
      setDocuments(documentsData);
    } catch (err: any) {
      console.error('Failed to fetch documents:', err);
      // Don't show error to user, just log it
    } finally {
      setDocumentsLoading(false);
    }
  }

  async function handleInitialConsultationComplete() {
    setLoading(true);
    setError('');
    try {
      await changeUserStatus({ userId: currentUser.id, newState: 'INITIAL_CONSULTATION_COMPLETED' });
      // Update the local user state to reflect the change
      setCurrentUser({ ...currentUser, userState: 'INITIAL_CONSULTATION_COMPLETED' });
      // Don't close the modal - let user see the progress to next step
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  }

  async function handleCommunicatedWithBank() {
    setLoading(true);
    setError('');
    try {
      await changeUserStatus({ userId: currentUser.id, newState: 'COMMUNICATED_WITH_BANK' });
      // Update the local user state to reflect the change
      setCurrentUser({ ...currentUser, userState: 'COMMUNICATED_WITH_BANK' });
      // Don't close the modal - let user see the progress to next step
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  }

  async function handleReceivedBankResponse() {
    setLoading(true);
    setError('');
    try {
      await changeUserStatus({ userId: currentUser.id, newState: 'RECEIVED_BANK_RESPONSE' });
      // Update the local user state to reflect the change
      setCurrentUser({ ...currentUser, userState: 'RECEIVED_BANK_RESPONSE' });
      // Don't close the modal - let user see the progress to next step
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  }

  async function handleSettlementCompleted() {
    setLoading(true);
    setError('');
    try {
      await changeUserStatus({ userId: currentUser.id, newState: 'SETTLEMENT_COMPLETED' });
      // Update the local user state to reflect the change
      setCurrentUser({ ...currentUser, userState: 'SETTLEMENT_COMPLETED' });
      // Don't close the modal - let user see the progress to next step
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitBankResponse(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('userId', String(currentUser.id));
    formData.append('file', bankResponseFile!);
    formData.append('amount', amount);
    formData.append('remarks', remarks);

    try {
      const response = await fetch(`${apiConfig.baseURL}/documents/submit-bank-response-file`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit bank response');
      }
      
      // Also update the user status to FINAL_RESPONSE_COMMUNICATED
      await changeUserStatus({ userId: currentUser.id, newState: 'FINAL_RESPONSE_COMMUNICATED' });
      
      // Update the local user state to reflect the change
      setCurrentUser({ 
        ...currentUser, 
        userState: 'FINAL_RESPONSE_COMMUNICATED',
        bankResponse: 'Submitted',
        bankResponseRemarks: remarks,
        paymentAmount: parseFloat(amount)
      });
      
      // Reset form
      setBankResponseFile(null);
      setAmount('');
      setRemarks('');
      
    } catch (err: any) {
      setError(err.message || 'Failed to submit bank response');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div style={{
        background: '#fff',
        borderRadius: 14,
        boxShadow: '0 2px 12px #e2e8f0',
        padding: '1.5rem 1.5rem 1.2rem 1.5rem',
        marginBottom: 24,
        maxWidth: 420,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: 22,
          }}>{user.firstName?.[0] || '?'}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#2d3748' }}>{user.firstName} {user.lastName}</div>
            <div style={{ color: '#667eea', fontSize: 15 }}>{user.email}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 15 }}>
          <div><b>PAN:</b> {user.panNumber}</div>
          <div><b>Mobile:</b> {user.mobileNumber}</div>
        </div>
        <div style={{ marginTop: 6, fontSize: 15 }}>
          <b>Status:</b> <span style={{ background: '#f8fafd', borderRadius: 6, padding: '2px 8px', fontWeight: 600 }}>{user.userState}</span>
        </div>
        <button
          style={{
            marginTop: 18,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '0.7rem 1.6rem',
            fontWeight: 700,
            fontSize: 16,
            boxShadow: '0 2px 8px #764ba244',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'all 0.2s',
          }}
          onClick={fetchLatestUserData}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Check Details'}
        </button>
      </div>
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 4px 32px #764ba244',
            padding: '2.5rem 2.5rem 2rem 2.5rem',
            minWidth: 340,
            maxWidth: 520,
            textAlign: 'center',
            position: 'relative',
          }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: 16, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#764ba2', cursor: 'pointer' }}>&times;</button>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#764ba2', marginBottom: 10 }}>User Progress</div>
            <Stepper currentStep={currentStep} />
            <div style={{ marginTop: 18, textAlign: 'left', fontSize: 16, color: '#2d3748', minHeight: 80 }}>
              {/* Modal content changes based on currentStep/userState */}
              {currentStep === 1 && (
                <div>Registration completed. Awaiting user to request initial consultation.</div>
              )}
              {currentStep === 2 && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: 'linear-gradient(135deg, #f8fafd 0%, #e2e8f0 100%)', 
                    borderRadius: 12, 
                    padding: '1.5rem', 
                    marginBottom: 20,
                    border: '2px solid #667eea',
                    boxShadow: '0 2px 8px #667eea22'
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#764ba2', marginBottom: 8 }}>
                      📞 Initial Consultation Requested
                    </div>
                    <div style={{ color: '#2d3748', fontSize: 16, marginBottom: 12 }}>
                      Contact the user at <span style={{ fontWeight: 700, color: '#667eea' }}>{currentUser.mobileNumber}</span>
                    </div>
                    <div style={{ color: '#718096', fontSize: 14 }}>
                      User: <b>{currentUser.firstName} {currentUser.lastName}</b><br />
                      Email: <b>{currentUser.email}</b>
                    </div>
                  </div>
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #38a169 0%, #48bb78 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '0.8rem 2rem',
                      fontWeight: 700,
                      fontSize: 16,
                      boxShadow: '0 2px 12px #38a16944',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.7 : 1,
                      transition: 'all 0.2s',
                    }}
                    onClick={handleInitialConsultationComplete}
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : '✅ Initial Consultation Done'}
                  </button>
                  {error && <div style={{ color: '#f56565', marginTop: 12, fontSize: 14 }}>{error}</div>}
                </div>
              )}
              {currentStep === 3 && (
                <div>Initial consultation completed. User can now express intent for debt settlement.</div>
              )}
              {currentStep === 4 && (
                <div>User has expressed intent for debt settlement. Awaiting document upload.</div>
              )}
              {currentStep === 5 && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: 'linear-gradient(135deg, #f8fafd 0%, #e2e8f0 100%)', 
                    borderRadius: 12, 
                    padding: '1.5rem', 
                    marginBottom: 20,
                    border: '2px solid #667eea',
                    boxShadow: '0 2px 8px #667eea22'
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#764ba2', marginBottom: 8 }}>
                      📄 Documents Uploaded
                    </div>
                    <div style={{ color: '#2d3748', fontSize: 16, marginBottom: 12 }}>
                      All required documents have been uploaded successfully
                    </div>
                    <div style={{ color: '#718096', fontSize: 14 }}>
                      Ready to communicate with the user's bank
                    </div>
                  </div>

                  {/* Documents Section */}
                  <div style={{ 
                    background: '#f8fafd', 
                    borderRadius: 12, 
                    padding: '1.5rem', 
                    marginBottom: 20,
                    textAlign: 'left'
                  }}>
                    <div style={{ fontWeight: 700, color: '#2d3748', fontSize: 16, marginBottom: 16 }}>
                      📋 Uploaded Documents
                    </div>
                    
                    {documentsLoading ? (
                      <div style={{ color: '#718096', fontSize: 14, textAlign: 'center' }}>
                        Loading documents...
                      </div>
                    ) : documents ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {documents.AADHAARCARD && (
                          <div style={{ 
                            background: '#fff', 
                            padding: '12px', 
                            borderRadius: 8, 
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12
                          }}>
                            <div style={{ 
                              width: 32, 
                              height: 32, 
                              background: '#667eea', 
                              borderRadius: 6,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              fontWeight: 700,
                              fontSize: 14
                            }}>
                              🆔
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 600, color: '#2d3748', fontSize: 14 }}>Aadhaar Card</div>
                              <a 
                                href={documents.AADHAARCARD} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ 
                                  color: '#667eea', 
                                  fontSize: 12, 
                                  textDecoration: 'none',
                                  fontWeight: 500
                                }}
                              >
                                View Document →
                              </a>
                            </div>
                          </div>
                        )}
                        
                        {documents.PANCARD && (
                          <div style={{ 
                            background: '#fff', 
                            padding: '12px', 
                            borderRadius: 8, 
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12
                          }}>
                            <div style={{ 
                              width: 32, 
                              height: 32, 
                              background: '#667eea', 
                              borderRadius: 6,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              fontWeight: 700,
                              fontSize: 14
                            }}>
                              🆔
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 600, color: '#2d3748', fontSize: 14 }}>PAN Card</div>
                              <a 
                                href={documents.PANCARD} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ 
                                  color: '#667eea', 
                                  fontSize: 12, 
                                  textDecoration: 'none',
                                  fontWeight: 500
                                }}
                              >
                                View Document →
                              </a>
                            </div>
                          </div>
                        )}
                        
                        {documents.LOAN_STATEMENT && (
                          <div style={{ 
                            background: '#fff', 
                            padding: '12px', 
                            borderRadius: 8, 
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12
                          }}>
                            <div style={{ 
                              width: 32, 
                              height: 32, 
                              background: '#667eea', 
                              borderRadius: 6,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              fontWeight: 700,
                              fontSize: 14
                            }}>
                              📄
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 600, color: '#2d3748', fontSize: 14 }}>Loan Statement</div>
                              <a 
                                href={documents.LOAN_STATEMENT} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ 
                                  color: '#667eea', 
                                  fontSize: 12, 
                                  textDecoration: 'none',
                                  fontWeight: 500
                                }}
                              >
                                View Document →
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={fetchUserDocuments}
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '8px 16px',
                          fontWeight: 600,
                          fontSize: 14,
                          cursor: 'pointer',
                          width: '100%',
                        }}
                      >
                        📋 Load Documents
                      </button>
                    )}
                  </div>

                  <button
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '0.8rem 2rem',
                      fontWeight: 700,
                      fontSize: 16,
                      boxShadow: '0 2px 12px #667eea44',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.7 : 1,
                      transition: 'all 0.2s',
                    }}
                    onClick={handleCommunicatedWithBank}
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : '🏦 Communicated with Bank'}
                  </button>
                  {error && <div style={{ color: '#f56565', marginTop: 12, fontSize: 14 }}>{error}</div>}
                </div>
              )}
              {currentStep === 6 && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: 'linear-gradient(135deg, #f8fafd 0%, #e2e8f0 100%)', 
                    borderRadius: 12, 
                    padding: '1.5rem', 
                    marginBottom: 20,
                    border: '2px solid #667eea',
                    boxShadow: '0 2px 8px #667eea22'
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#764ba2', marginBottom: 8 }}>
                      🏦 Communicated with Bank
                    </div>
                    <div style={{ color: '#2d3748', fontSize: 16, marginBottom: 12 }}>
                      Bank communication initiated
                    </div>
                    <div style={{ color: '#718096', fontSize: 14 }}>
                      Awaiting response from the bank
                    </div>
                  </div>
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #38a169 0%, #48bb78 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '0.8rem 2rem',
                      fontWeight: 700,
                      fontSize: 16,
                      boxShadow: '0 2px 12px #38a16944',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.7 : 1,
                      transition: 'all 0.2s',
                    }}
                    onClick={handleReceivedBankResponse}
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : '📨 Received Response from Bank'}
                  </button>
                  {error && <div style={{ color: '#f56565', marginTop: 12, fontSize: 14 }}>{error}</div>}
                </div>
              )}
              {currentStep === 7 && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: 'linear-gradient(135deg, #f8fafd 0%, #e2e8f0 100%)', 
                    borderRadius: 12, 
                    padding: '1.5rem', 
                    marginBottom: 20,
                    border: '2px solid #667eea',
                    boxShadow: '0 2px 8px #667eea22'
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#764ba2', marginBottom: 8 }}>
                      📨 Received Bank Response
                    </div>
                    <div style={{ color: '#2d3748', fontSize: 16, marginBottom: 12 }}>
                      Bank has responded to the settlement request
                    </div>
                    <div style={{ color: '#718096', fontSize: 14 }}>
                      Please upload the bank response document and details
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmitBankResponse} style={{ 
                    background: '#f8fafd', 
                    borderRadius: 12, 
                    padding: '1.5rem', 
                    marginBottom: 20,
                    textAlign: 'left'
                  }}>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontWeight: 600, color: '#2d3748', marginBottom: 6 }}>
                        Bank Response Document (PDF):
                      </label>
                      <input 
                        type="file" 
                        accept="application/pdf" 
                        required 
                        onChange={e => setBankResponseFile(e.target.files?.[0] || null)}
                        style={{ 
                          width: '100%', 
                          padding: '8px', 
                          border: '1px solid #e2e8f0', 
                          borderRadius: 6,
                          background: '#fff'
                        }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontWeight: 600, color: '#2d3748', marginBottom: 6 }}>
                        Settlement Amount (₹):
                      </label>
                      <input 
                        type="number" 
                        required 
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        style={{ 
                          width: '100%', 
                          padding: '8px', 
                          border: '1px solid #e2e8f0', 
                          borderRadius: 6,
                          background: '#fff'
                        }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontWeight: 600, color: '#2d3748', marginBottom: 6 }}>
                        Remarks:
                      </label>
                      <textarea 
                        required 
                        value={remarks}
                        onChange={e => setRemarks(e.target.value)}
                        placeholder="Enter bank response remarks"
                        rows={3}
                        style={{ 
                          width: '100%', 
                          padding: '8px', 
                          border: '1px solid #e2e8f0', 
                          borderRadius: 6,
                          background: '#fff',
                          resize: 'vertical'
                        }}
                      />
                    </div>
                    
                    <button
                      type="submit"
                      style={{
                        background: 'linear-gradient(135deg, #38a169 0%, #48bb78 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '0.8rem 2rem',
                        fontWeight: 700,
                        fontSize: 16,
                        boxShadow: '0 2px 12px #38a16944',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1,
                        transition: 'all 0.2s',
                        width: '100%',
                      }}
                      disabled={loading || !bankResponseFile || !amount || !remarks}
                    >
                      {loading ? 'Submitting...' : '📤 Submit Bank Response'}
                    </button>
                  </form>
                  
                  {error && <div style={{ color: '#f56565', marginTop: 12, fontSize: 14 }}>{error}</div>}
                </div>
              )}
              {currentStep === 8 && (
                <div>Final response communicated to user. Awaiting payment.<br /><b>Payment Amount:</b> {currentUser.paymentAmount !== null ? `₹${currentUser.paymentAmount}` : '-'}</div>
              )}
              {currentStep === 9 && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: 'linear-gradient(135deg, #f8fafd 0%, #e2e8f0 100%)', 
                    borderRadius: 12, 
                    padding: '1.5rem', 
                    marginBottom: 20,
                    border: '2px solid #667eea',
                    boxShadow: '0 2px 8px #667eea22'
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#764ba2', marginBottom: 8 }}>
                      💳 Payment Completed
                    </div>
                    <div style={{ color: '#2d3748', fontSize: 16, marginBottom: 12 }}>
                      Settlement process has been initiated
                    </div>
                    <div style={{ color: '#718096', fontSize: 14 }}>
                      Payment Amount: <b>₹{currentUser.paymentAmount || '-'}</b>
                    </div>
                  </div>
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #38a169 0%, #48bb78 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '0.8rem 2rem',
                      fontWeight: 700,
                      fontSize: 16,
                      boxShadow: '0 2px 12px #38a16944',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.7 : 1,
                      transition: 'all 0.2s',
                    }}
                    onClick={handleSettlementCompleted}
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : '🎉 Settlement Completed'}
                  </button>
                  {error && <div style={{ color: '#f56565', marginTop: 12, fontSize: 14 }}>{error}</div>}
                </div>
              )}
              {currentStep === 10 && (
                <div>🎉 Settlement completed! User's debt settlement process is finished.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 