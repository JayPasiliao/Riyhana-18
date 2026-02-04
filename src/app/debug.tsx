"use client";

export default function DebugPage() {
  return (
    <div style={{ 
      padding: '2rem', 
      background: '#F9EEE2', 
      minHeight: '100vh',
      color: '#3C2D28'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Debug Page</h1>
      <p>If you see this, React is rendering.</p>
      <p>Timestamp: {new Date().toISOString()}</p>
      <p>User Agent: {typeof window !== 'undefined' ? navigator.userAgent : 'Server'}</p>
    </div>
  );
}
