function ErrorMessage({ error }) {
  if (!error) return null;
  return (
    <div className="w-full text-center text-red-600 font-semibold mb-2">{error}</div>
  );
}

export default ErrorMessage; 