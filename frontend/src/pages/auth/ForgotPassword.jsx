import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-sm text-center mt-3">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-500 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
