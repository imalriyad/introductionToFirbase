import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app from "../Module49/Component/Firebase/firbase.config";
import { useState } from "react";
import { LiaEyeSolid, LiaEyeSlash } from "react-icons/lia";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passToggle, setPassToggle] = useState(false);

  const SignUpHandelar = (e) => {
    e.preventDefault();
    const termsAndCondition = e.target.terms.checked;
    const email = e.target.email.value;
    const password = e.target.password.value;
    setSuccessMessage("");
    setErrorMessage("");
    const auth = getAuth(app);

    if (password.length < 6) {
      setErrorMessage("Password length must be 6 or longer!");
      return;
    } else if (!/[A-z]/.test(password) && !/[a-z]/.test(password) && !/[0-1]/.test(password)) {
      setErrorMessage("Password must have specal carecter");
      return;
    }
    else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
        setErrorMessage('enter a valid Email')
    }

    else if(!termsAndCondition){
          setErrorMessage('Accept terms and condition to progress')
          return
    }
    
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        sendEmailVerification(auth.currentUser)
        .then(()=> alert('please cheak your email and varify!'))
        .catch(error => console.log(error))
        setSuccessMessage("Registration Succesful")
      })
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <div>
      <div className="hero h-[60vh] bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up Now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={SignUpHandelar}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="input input-bordered"
                  />
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
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
                      className="input input-bordered w-full"
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
                  <span className="flex text-sm mt-5 items-center"><input type="checkbox" name="terms" className="mr-2 checkbox checkbox-primary checkbox-sm" /> I accpet terms and condition</span>
                </div>

                <div className="form-control mt-6">
                  <input
                    type="submit"
                    className="btn btn-primary text-white"
                    value="Sign Up"
                  />
                  <p className="mt-2">Already have Account? <Link to={'/signin'}><span className="underline">Sign In</span></Link></p>
                  <p className="text-red-400">{errorMessage && errorMessage}</p>
                  <p className="text-green-500">
                    {successMessage && successMessage}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
