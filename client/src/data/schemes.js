export async function fetchSchemes() {
  const response = await fetch('https://sahayakai-your-voice-powered-guide-to.onrender.com/api/scheme');
  if (!response.ok) {
    throw new Error('Failed to fetch schemes');
  }
  return await response.json();
} 