import React, { useState } from "react";

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    // Send email to reset password...
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-md w-full px-4 rounded-lg p-4">
        <div className="space-y-4 m-3">
          <span className="text-2xl font-medium">Reset password</span>
          <form className="space-y-4">
            <label htmlFor="email" className="font-medium text-gray-600 text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="rounded-md w-full py-1.5 px-3 border border-gray-300"
              onChange={(e) => setEmail(e.target.value.trim())}
            />
            <button
              onClick={handlePasswordReset}
              className="rounded-md bg-blue-600 text-white font-medium px-3 py-2 w-full"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
