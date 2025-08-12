const Welcome = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',
      padding: '1rem',
      textAlign: 'center'
    }}>
      <h1>Welcome to Notepia</h1>
      <p>Your personal notes companion — stay organized and inspired.</p>
      <p>
        <a href="/login" style={{ color: '#4a90e2', textDecoration: 'none' }}>Log in</a> or{' '}
        <a href="/signup" style={{ color: '#4a90e2', textDecoration: 'none' }}>Sign up</a> to get started.
      </p>
    </div>
  )
}

export default Welcome;
