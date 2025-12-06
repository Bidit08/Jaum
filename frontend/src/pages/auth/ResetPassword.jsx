export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium">New Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
