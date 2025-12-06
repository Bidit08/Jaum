import { Link } from "react-router-dom";

export default function VerificationPrompt() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
        <p className="text-gray-600 mb-6">
          We've sent you a verification link. Please check your inbox.
        </p>

        <Link
          to="/login"
          className="inline-block w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
