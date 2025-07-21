export async function fetchSchemes() {
  const response = await fetch('https://sahayakai-your-voice-powered-guide-to.onrender.com/api/scheme', {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch schemes');
  }
  return await response.json();
} 