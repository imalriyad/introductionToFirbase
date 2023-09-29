import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../Module49/Component/Firebase/firbase.config";
import { useRef, useState } from "react";
import { LiaEyeSolid, LiaEyeSlash } from "react-icons/lia";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passToggle, setPassToggle] = useState(false);
  const emailRef = useRef();
  const SignInHandelar = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const auth = getAuth(app);
    setErrorMessage("");
    setSuccessMessage("");
    if (password.length < 6) {
      setErrorMessage("Password length must be 6 or longer!");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (res.user.emailVerified === true) {
          setSuccessMessage("Login Succesful");
          return;
        } else {
          alert("Please varify your email first");
          return;
        }
      })
      .catch((error) => setErrorMessage(error.message));
  };
  const resetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("please provide your email");
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      alert("please provide a valid email");
    }
    const auth = getAuth(app);
    sendPasswordResetEmail(auth, email)
      .then(() => alert("Please cheak your email for resting passowrd"))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="hero h-[60vh] bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign In Now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={SignInHandelar}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={`${passToggle ? "text" : "password"}`}
                      name="password"
                      required
                      placeholder="Password"
                      className="input input-bordered"
                    />
                    <span
                      onClick={() => setPassToggle(!passToggle)}
                      className="cursor-pointer absolute text-2xl right-[12px] top-[12px]"
                    >
                      {passToggle ? (
                        <LiaEyeSlash></LiaEyeSlash>
                      ) : (
                        <LiaEyeSolid></LiaEyeSolid>
                      )}
                    </span>
                  </div>
                  <label className="label">
                    <a
                      onClick={resetPassword}
                      href="#"
                      className="label-text-alt link link-hover"
                    >
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <input
                    type="submit"
                    className="btn text-white btn-primary"
                    value="Sign In"
                  />
                  <p className="mt-2">
                    Dont Have an account?{" "}
                    <Link to={"/signup"}>
                      <span className="underline">Sign Up</span>
                    </Link>
                  </p>
                  <p className="text-green-500">
                    {successMessage && successMessage}
                  </p>
                  <p className="text-red-400">{errorMessage && errorMessage}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
