import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const initialvalues = { email: "", password: "", confirmPassword: "" };
  const [formvalues, setformvalues] = useState(initialvalues);
  const [formerrors, setformerrors] = useState({});
  const [submit, setsubmit] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setformvalues({ ...formvalues, [name]: value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setformerrors(validate(formvalues));
    setsubmit(true);
    console.log(formvalues);
  };

  const validate = (values) => {
    const errors = {};
    const regx = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/i;

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regx.test(values.email)) {
      errors.email = "This is not a valid email format";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password should not be less than 4 characters";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm your password";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  return (
    <div className="flex justify-center items-center mt-[100px] lg:flex lg:justify-center lg:items-center lg:mt-[100px]">
      <form
        onSubmit={handlesubmit}
        className="w-[310px] pl-[20px] pt-[30px] h-[500px] lg:h-[600px] lg:w-[500px] border-2 border-black lg:pt-[50px]"
      >
        <div className="flex justify-center">
          <p className="text-[25px] lg:text-[20px]">Create Your Account</p>
        </div>

        <div className="mb-[20px] mt-[20px] lg:mb-[25px]">
          <label className="text-[20px] lg:text-[25px] lg:flex lg:justify-center lg:items-center">
            Email:
          </label>
          <div className="lg:flex lg:justify-center lg:items-center">
            <input
              type="email"
              onChange={change}
              placeholder="Email"
              name="email"
              className="h-[40px] rounded-md border-2 border-black lg:w-[250px]"
              value={formvalues.email}
            />
          </div>
          <p className="lg:text-[20px] text-red-500 lg:flex lg:justify-center lg:items-center">
            {formerrors.email}
          </p>
        </div>

        <div className="mb-[20px] lg:mb-[25px]">
          <label className="text-[20px] lg:text-[25px] lg:flex lg:justify-center lg:items-center">
            Password:
          </label>
          <div className="lg:flex lg:justify-center lg:items-center">
            <input
              type="password"
              onChange={change}
              placeholder="Password"
              name="password"
              className="h-[40px] rounded-md border-2 border-black lg:w-[250px]"
              value={formvalues.password}
            />
          </div>
          <p className="lg:text-[20px] text-red-500 lg:flex lg:justify-center lg:items-center">
            {formerrors.password}
          </p>
        </div>

        <div className="mb-[20px] lg:mb-[25px]">
          <label className="text-[20px] lg:text-[25px] lg:flex lg:justify-center lg:items-center">
            Confirm Password:
          </label>
          <div className="lg:flex lg:justify-center lg:items-center">
            <input
              type="password"
              onChange={change}
              placeholder="Confirm Password"
              name="confirmPassword"
              className="h-[40px] rounded-md border-2 border-black lg:w-[250px]"
              value={formvalues.confirmPassword}
            />
          </div>
          <p className="lg:text-[20px] text-red-500 lg:flex lg:justify-center lg:items-center">
            {formerrors.confirmPassword}
          </p>
        </div>

        <div className="flex justify-center lg:flex lg:justify-center lg:items-center">
          <button className="text-[20px] h-[45px] w-[90px] border-2 border-blue-900 bg-blue-400 text-white lg:h-[40px] lg:w-[120px] lg:text-[25px] rounded-lg font-bold">
            Register
          </button>
        </div>

        <div className="cursor-pointer underline text-blue-500 lg:ml-[115px] lg:mt-2">
          <Link to="/login">
            <span>Already have an account? Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
