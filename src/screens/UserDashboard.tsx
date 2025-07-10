import React, { useState } from 'react';
import './Stepper.css';
import Services from '../components/Services';
import { changeUserStatus, uploadDocuments } from '../api/userService';

const dummyLoans = [
  {
    loanId: 'LOAN001',
    lenderName: 'HDFC Bank',
    totalAmount: 500000,
    outstandingAmount: 300000,
    status: 'ACTIVE',
  },
  {
    loanId: 'LOAN002',
    lenderName: 'ICICI Bank',
    totalAmount: 300000,
    outstandingAmount: 150000,
    status: 'ACTIVE',
  },
];

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

function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="stepper-scroll-wrapper">
      <div className="stepper">
        {steps.map((step, idx) => (
          <React.Fragment key={step}>
            <div className={`stepper-step${idx + 1 <= currentStep ? ' active' : ''}${idx + 1 === currentStep ? ' current' : ''}`}> 
              <div className="stepper-circle">{idx + 1}</div>
              <div className="stepper-label">{step}</div>
            </div>
            {idx < steps.length - 1 && (
              <div className={`stepper-connector${idx + 1 < currentStep ? ' active' : ''}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function UserDashboard({ user }: { user?: any }) {
  const [localUser, setLocalUser] = useState(user);
  const name = localUser ? `${localUser.firstName} ${localUser.lastName}` : 'User';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [panFile, setPanFile] = useState<File | null>(null);
  const [loanFile, setLoanFile] = useState<File | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  // Map each status to its step index (1-based)
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
  const userStatus = localUser?.userStatus;
  const currentStep = statusToStep[userStatus] ?? 1;

  async function handleRequestConsultation() {
    setLoading(true);
    setError('');
    try {
      await changeUserStatus({ userId: localUser.id, newState: 'REQUESTED_INITIAL_CONSULTATION' });
      setLocalUser({ ...localUser, userStatus: 'REQUESTED_INITIAL_CONSULTATION' });
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  }

  async function handleIntentForDebtSettlement() {
    setLoading(true);
    setError('');
    try {
      await changeUserStatus({ userId: localUser.id, newState: 'INTENT_FOR_DEBT_SETTLEMENT' });
      setLocalUser({ ...localUser, userStatus: 'INTENT_FOR_DEBT_SETTLEMENT' });
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  }

  async function handleDocumentUpload(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!aadhaarFile || !panFile || !loanFile) {
      setError('Please select all required documents.');
      setLoading(false);
      return;
    }
    try {
      await uploadDocuments({
        userId: localUser.id,
        aadhaarcard: aadhaarFile,
        pancard: panFile,
        loanstatement: loanFile,
      });
      setSuccessModal(true);
    } catch (err: any) {
      setError(err.message || 'Failed to upload documents');
    } finally {
      setLoading(false);
    }
  }

  function handleSuccessModalOk() {
    setSuccessModal(false);
    setLocalUser({ ...localUser, userStatus: 'DOCUMENTS_UPLOADED' });
  }

  return (
    <div>
      <h2>Welcome, {name}!</h2>
      <Stepper currentStep={currentStep} />
      {currentStep === 1 && (
        <>
          <Services />
          <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0 2.5rem 0', flexDirection: 'column', alignItems: 'center' }}>
            <button
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #e2e8f0 100%)',
                color: '#764ba2',
                border: '2px solid #764ba2',
                borderRadius: 8,
                padding: '0.9rem 2.2rem',
                fontWeight: 700,
                fontSize: 18,
                boxShadow: '0 2px 12px #764ba222',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s, color 0.2s',
                opacity: loading ? 0.7 : 1,
              }}
              onClick={handleRequestConsultation}
              disabled={loading}
            >
              {loading ? 'Requesting...' : 'Request For Initial Consultation'}
            </button>
            {error && <div style={{ color: '#f56565', marginTop: 12 }}>{error}</div>}
          </div>
        </>
      )}
      {currentStep === 2 && (
        <div style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 8px #e2e8f0',
          padding: '2rem 1.5rem',
          maxWidth: 480,
          margin: '2.5rem auto',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 20, fontWeight: 600, color: '#764ba2', marginBottom: 12 }}>
            Please wait, our representative will contact you on
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#2d3748', letterSpacing: 1, marginBottom: 4 }}>
            {localUser?.mobileNumber}
          </div>
          <div style={{ color: '#718096', fontSize: 15 }}>
            Keep your phone handy for a call or message from our team.
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <div style={{ margin: '2.5rem auto', maxWidth: 600 }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 8px #e2e8f0',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            marginBottom: 32,
          }}>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#764ba2', marginBottom: 12 }}>
              Initial Consultation Completed
            </div>
            <div style={{ color: '#718096', fontSize: 15, marginBottom: 18 }}>
              If you have any further queries, please contact us below.
            </div>
            <div style={{
              background: '#f8fafd',
              borderRadius: 8,
              padding: '1rem 0.5rem',
              margin: '0 auto 18px auto',
              display: 'inline-block',
              minWidth: 220,
            }}>
              <div style={{ fontWeight: 600, color: '#2d3748', fontSize: 16, marginBottom: 4 }}>Contact Us</div>
              <div style={{ color: '#764ba2', fontSize: 15, marginBottom: 2 }}>info@neurofi.com</div>
              <div style={{ color: '#764ba2', fontSize: 15 }}>9113662144</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
              <button
                style={{
                  background: 'linear-gradient(135deg, #fff 0%, #e2e8f0 100%)',
                  color: '#764ba2',
                  border: '2px solid #764ba2',
                  borderRadius: 8,
                  padding: '0.9rem 2.2rem',
                  fontWeight: 700,
                  fontSize: 18,
                  boxShadow: '0 2px 12px #764ba222',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                  opacity: loading ? 0.7 : 1,
                }}
                onClick={handleIntentForDebtSettlement}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Intent For Debt Settlement'}
              </button>
            </div>
            {error && <div style={{ color: '#f56565', marginTop: 12 }}>{error}</div>}
          </div>
        </div>
      )}
      {currentStep === 4 && (
        <div style={{ margin: '2.5rem auto', maxWidth: 600 }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 4px 24px rgba(102, 126, 234, 0.10)',
            padding: '2.5rem 2rem 2rem 2rem',
            textAlign: 'center',
            marginBottom: 32,
          }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#764ba2', marginBottom: 28, letterSpacing: 0.5 }}>
              Please upload the required documents
            </div>
            <form onSubmit={handleDocumentUpload} style={{ width: '100%', maxWidth: 440, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 1.5rem', alignItems: 'center', background: '#f8fafd', borderRadius: 12, padding: '2rem 1.2rem 1.2rem 1.2rem', boxShadow: '0 2px 8px #e2e8f0', marginBottom: 18 }}>
              <label htmlFor="aadhaar-upload" style={{ fontWeight: 600, color: '#2d3748', fontSize: 16, textAlign: 'right' }}>Aadhaar Card (PDF):</label>
              <input id="aadhaar-upload" type="file" accept="application/pdf" required onChange={e => setAadhaarFile(e.target.files?.[0] || null)} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 7, padding: '7px 8px', fontSize: 15 }} />
              <label htmlFor="pan-upload" style={{ fontWeight: 600, color: '#2d3748', fontSize: 16, textAlign: 'right' }}>PAN Card (PDF):</label>
              <input id="pan-upload" type="file" accept="application/pdf" required onChange={e => setPanFile(e.target.files?.[0] || null)} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 7, padding: '7px 8px', fontSize: 15 }} />
              <label htmlFor="loan-upload" style={{ fontWeight: 600, color: '#2d3748', fontSize: 16, textAlign: 'right' }}>Loan Statement (PDF):</label>
              <input id="loan-upload" type="file" accept="application/pdf" required onChange={e => setLoanFile(e.target.files?.[0] || null)} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 7, padding: '7px 8px', fontSize: 15 }} />
            </form>
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #e2e8f0 100%)',
                color: '#764ba2',
                border: '2px solid #764ba2',
                borderRadius: 10,
                padding: '1.1rem 2.8rem',
                fontWeight: 700,
                fontSize: 22,
                boxShadow: '0 2px 16px #764ba222',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
                opacity: loading ? 0.7 : 1,
                margin: '0 auto',
                marginTop: 10,
                display: 'block',
              }}
              disabled={loading}
              onClick={handleDocumentUpload}
            >
              {loading ? 'Uploading...' : 'Upload Documents'}
            </button>
            {error && <div style={{ color: '#f56565', marginTop: 16, fontWeight: 500 }}>{error}</div>}
            {successModal && (
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
                  minWidth: 320,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#764ba2', marginBottom: 18 }}>
                    Documents uploaded successfully!
                  </div>
                  <button
                    onClick={handleSuccessModalOk}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '0.8rem 2.2rem',
                      fontWeight: 700,
                      fontSize: 18,
                      boxShadow: '0 2px 12px #764ba244',
                      cursor: 'pointer',
                      marginTop: 10,
                    }}
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {currentStep === 5 && (
        <div style={{ margin: '2.5rem auto', maxWidth: 600 }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 8px #e2e8f0',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            marginBottom: 32,
          }}>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#764ba2', marginBottom: 12 }}>
              Thank you for uploading your documents!
            </div>
            <div style={{ color: '#718096', fontSize: 15, marginBottom: 18 }}>
              We will now communicate with your banks. This process may take a few days.<br />
              For any queries, please contact us below.
            </div>
            <div style={{
              background: '#f8fafd',
              borderRadius: 8,
              padding: '1rem 0.5rem',
              margin: '0 auto 18px auto',
              display: 'inline-block',
              minWidth: 220,
            }}>
              <div style={{ fontWeight: 600, color: '#2d3748', fontSize: 16, marginBottom: 4 }}>Contact Us</div>
              <div style={{ color: '#764ba2', fontSize: 15, marginBottom: 2 }}>info@neurofi.com</div>
              <div style={{ color: '#764ba2', fontSize: 15 }}>9113662144</div>
            </div>
          </div>
        </div>
      )}
      {currentStep === 6 && (
        <div style={{ margin: '2.5rem auto', maxWidth: 600 }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 8px #e2e8f0',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            marginBottom: 32,
          }}>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#764ba2', marginBottom: 12 }}>
              We have communicated with your bank and are waiting for their reply.
            </div>
            <div style={{ color: '#718096', fontSize: 15, marginBottom: 18 }}>
              This process may take a few days. For any queries, please contact us below.
            </div>
            <div style={{
              background: '#f8fafd',
              borderRadius: 8,
              padding: '1rem 0.5rem',
              margin: '0 auto 18px auto',
              display: 'inline-block',
              minWidth: 220,
            }}>
              <div style={{ fontWeight: 600, color: '#2d3748', fontSize: 16, marginBottom: 4 }}>Contact Us</div>
              <div style={{ color: '#764ba2', fontSize: 15, marginBottom: 2 }}>info@neurofi.com</div>
              <div style={{ color: '#764ba2', fontSize: 15 }}>9113662144</div>
            </div>
          </div>
        </div>
      )}
      {currentStep === 7 && (
        <div style={{ margin: '2.5rem auto', maxWidth: 600 }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 8px #e2e8f0',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            marginBottom: 32,
          }}>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#764ba2', marginBottom: 12 }}>
              We have received a response from your bank and will update you shortly.
            </div>
            <div style={{ color: '#718096', fontSize: 15, marginBottom: 18 }}>
              For any queries, please contact us below.
            </div>
            <div style={{
              background: '#f8fafd',
              borderRadius: 8,
              padding: '1rem 0.5rem',
              margin: '0 auto 18px auto',
              display: 'inline-block',
              minWidth: 220,
            }}>
              <div style={{ fontWeight: 600, color: '#2d3748', fontSize: 16, marginBottom: 4 }}>Contact Us</div>
              <div style={{ color: '#764ba2', fontSize: 15, marginBottom: 2 }}>info@neurofi.com</div>
              <div style={{ color: '#764ba2', fontSize: 15 }}>9113662144</div>
            </div>
          </div>
        </div>
      )}
      {currentStep === 8 && (
        <div style={{ margin: '2.5rem auto', maxWidth: 600 }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 8px #e2e8f0',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            marginBottom: 32,
          }}>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#764ba2', marginBottom: 12 }}>
              The bank has agreed to your settlement request!
            </div>
            <div style={{ color: '#718096', fontSize: 15, marginBottom: 18 }}>
              Terms & Conditions: <br />
              <span style={{ color: '#2d3748', fontWeight: 500 }}>
                (Bank's terms and conditions will be displayed here. Please review them carefully before proceeding.)
              </span>
            </div>
            <button
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '1rem 2.5rem',
                fontWeight: 700,
                fontSize: 18,
                boxShadow: '0 2px 12px #764ba244',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: 18,
                opacity: loading ? 0.7 : 1,
                transition: 'background 0.2s, color 0.2s',
              }}
              onClick={() => setShowPaymentModal(true)}
              disabled={loading}
            >
              Proceed to Payment
            </button>
            {error && <div style={{ color: '#f56565', marginTop: 16, fontWeight: 500 }}>{error}</div>}
          </div>
        </div>
      )}
      {currentStep === 9 && (
        <div style={{ margin: '2.5rem auto', maxWidth: 600 }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 8px #e2e8f0',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            marginBottom: 32,
          }}>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#764ba2', marginBottom: 12 }}>
              We have initiated you settlement process!
            </div>
            <div style={{ color: '#718096', fontSize: 15, marginBottom: 18 }}>
              This process may take a few days.<br />
              For any queries, please contact us below.
            </div>
            <div style={{
              background: '#f8fafd',
              borderRadius: 8,
              padding: '1rem 0.5rem',
              margin: '0 auto 18px auto',
              display: 'inline-block',
              minWidth: 220,
            }}>
              <div style={{ fontWeight: 600, color: '#2d3748', fontSize: 16, marginBottom: 4 }}>Contact Us</div>
              <div style={{ color: '#764ba2', fontSize: 15, marginBottom: 2 }}>info@neurofi.com</div>
              <div style={{ color: '#764ba2', fontSize: 15 }}>9113662144</div>
            </div>
          </div>
        </div>
      )}
      {currentStep === 10 && (
        <div style={{ margin: '2.5rem auto', maxWidth: 600 }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 8px #e2e8f0',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            marginBottom: 32,
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#38a169', marginBottom: 12 }}>
              🎉 Settlement Completed!
            </div>
            <div style={{ color: '#718096', fontSize: 16, marginBottom: 18 }}>
              Congratulations! Your debt settlement process is now complete.<br />
              Thank you for trusting neurofi.<br />
              For any queries, please contact us below.
            </div>
            <div style={{
              background: '#f8fafd',
              borderRadius: 8,
              padding: '1rem 0.5rem',
              margin: '0 auto 18px auto',
              display: 'inline-block',
              minWidth: 220,
            }}>
              <div style={{ fontWeight: 600, color: '#2d3748', fontSize: 16, marginBottom: 4 }}>Contact Us</div>
              <div style={{ color: '#764ba2', fontSize: 15, marginBottom: 2 }}>info@neurofi.com</div>
              <div style={{ color: '#764ba2', fontSize: 15 }}>9113662144</div>
            </div>
          </div>
        </div>
      )}
      {/* Payment Modal */}
      {showPaymentModal && (
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
            minWidth: 320,
            textAlign: 'center',
          }}>
            {!showPaymentSuccess ? (
              <>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#764ba2', marginBottom: 18 }}>
                  Checkout Page
                </div>
                <div style={{
                  background: '#f8fafd',
                  borderRadius: 12,
                  boxShadow: '0 2px 8px #e2e8f0',
                  padding: '1.5rem 1.2rem',
                  marginBottom: 22,
                  textAlign: 'left',
                  maxWidth: 340,
                  margin: '0 auto 22px auto',
                }}>
                  <div style={{ fontWeight: 600, color: '#2d3748', fontSize: 17, marginBottom: 10 }}>Settlement Summary</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: '#718096' }}>Amount Due:</span>
                    <span style={{ color: '#764ba2', fontWeight: 700 }}>₹1,00,000</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: '#718096' }}>Bank Name:</span>
                    <span style={{ color: '#2d3748', fontWeight: 600 }}>HDFC Bank</span>
                  </div>
                  <div style={{ color: '#718096', fontSize: 15, marginTop: 10 }}>
                    <b>Terms:</b> Settle your outstanding loan at a reduced amount as agreed with the bank. Please review all terms before proceeding.
                  </div>
                </div>
                {/* Optional: mock payment method */}
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontWeight: 600, color: '#2d3748', fontSize: 15, marginBottom: 6 }}>Payment Method</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 38, height: 24, background: '#e2e8f0', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#667eea', fontSize: 15 }}>VISA</div>
                    <span style={{ color: '#718096', fontSize: 15 }}>**** 1234</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowPaymentSuccess(true)}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '1rem 2.5rem',
                    fontWeight: 700,
                    fontSize: 20,
                    boxShadow: '0 2px 12px #764ba244',
                    cursor: 'pointer',
                    marginTop: 10,
                    width: '100%',
                  }}
                >
                  Pay ₹1,00,000
                </button>
              </>
            ) : (
              <>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#38a169', marginBottom: 18 }}>
                  Payment successful!
                </div>
                <button
                  onClick={async () => {
                    setLoading(true);
                    setError('');
                    try {
                      await changeUserStatus({ userId: localUser.id, newState: 'PAYMENT_COMPLETED' });
                      setLocalUser({ ...localUser, userStatus: 'PAYMENT_COMPLETED' });
                      setShowPaymentModal(false);
                      setShowPaymentSuccess(false);
                    } catch (err: any) {
                      setError(err.message || 'Failed to update status');
                    } finally {
                      setLoading(false);
                    }
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '0.8rem 2.2rem',
                    fontWeight: 700,
                    fontSize: 18,
                    boxShadow: '0 2px 12px #764ba244',
                    cursor: 'pointer',
                    marginTop: 10,
                  }}
                >
                  OK
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 