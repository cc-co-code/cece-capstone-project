import { useState } from "react";
import { signIn, SignIn } from "next-auth/react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await signIn("email", {
      email,
      redirect: false,
    });

    if (result?.ok) {
      setMessage("Check your Email for the Magic Link!");
    } else {
      setMessage("Something went wrong, please try again!");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
        </label>
        <button type="submit" className="login-button">
          Send Magic Link
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;
