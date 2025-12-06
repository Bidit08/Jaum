import { Link } from "react-router-dom";

export default function OtpVerification() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center mb-6">
          OTP Verification
        </h2>

        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium">Enter OTP</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the 6-digit OTP"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg"
          >
            Verify OTP
          </button>
        </form>

        <p className="text-sm text-center mt-3">
          Didn't receive OTP? <button className="text-blue-500">Resend</button>
        </p>
      </div>
    </div>
  );
}
