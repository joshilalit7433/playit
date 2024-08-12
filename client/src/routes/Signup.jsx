import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Signup() {
  const initialvalues = {
    fullname: "",
    email: "",
    password: "",
    mobilenumber: "",
  };
  const [formvalues, setformvalues] = useState(initialvalues);
  const [formerrors, setformerrors] = useState({});
  const [submit, setsubmit] = useState(false);
  const change = (e) => {
    const { name, value } = e.target;
    setformvalues({ ...formvalues, [name]: value });
    console.log(formvalues);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setformerrors(validate(formvalues));
    setsubmit(true);
  };

  useEffect(() => {
    console.log(formerrors);
    if (Object.keys(formerrors).length === 0 && submit) console.log(formvalues);
  }, [formerrors]);

  const validate = (values) => {
    const errors = {};
    const regx = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/i;

    if (!values.fullname) {
      errors.fullname = "full name is required";
    }

    if (!values.email) {
      errors.email = "email is required";
    } else if (!regx.test(values.email)) {
      errors.email = "this is not the valid format";
    }

    if (!values.password) {
      errors.password = "password is required";
    } else if (values.password.length < 4) {
      errors.password = "password  should not be less than 4 character";
    } else if (values.password.length > 10) {
      errors.password = "password should not be more than 10 characters";
    }

    if (!values.mobilenumber) {
      errors.mobilenumber = "mobile number is required";
    } else if (values.mobilenumber.length < 10) {
      errors.mobilenumber = "invalid mobile number";
    } else if (values.mobilenumber.length === 10) {
      console.log("valid mobile number");
    } else if (values.mobilenumber.length > 11) {
      errors.mobilenumber = "invalid mobile number";
    }
    return errors;
  };

  return (
    <>
      <div className=" flex justify-center items-center mt-[100px] lg:flex lg:justify-center lg:items-center lg:mt-[100px] ">
        <form
          onSubmit={handlesubmit}
          className="  w-[310px] pl-[20px] pt-[30px] h-[700px]  lg:h-[900px] lg:w-[500px] border-2 border-black lg:pt-[50px]"
        >
          <div className="flex justify-center">
            <p className="text-[25px] lg:text-[20px]">Sign Up</p>
          </div>

          <div className=" mb-[20px] mt-[20px] lg:mb-[25px]">
            <label className=" text-[20px] lg:text-[25px] lg:flex lg:justify-center lg:items-center">
              Full Name:
            </label>

            <div className=" lg:flex lg:justify-center lg:items-center">
              <input
                type="text"
                onChange={change}
                placeholder="Full Name"
                name="fullname"
                className=" h-[40px]  rounded-md border-2 border-black lg:w-[250px]"
                value={formvalues.fullname}
              />
            </div>
            <p className=" lg:text-[20px] text-red-500 lg:flex lg:justify-center lg:items-center">
              {formerrors.fullname}
            </p>
          </div>

          <div className=" mb-[20px] mt-[20px] lg:mb-[25px]">
            <label className=" text-[20px] lg:text-[25px] lg:flex lg:justify-center lg:items-center">
              Email:
            </label>

            <div className=" lg:flex lg:justify-center lg:items-center">
              <input
                type="email"
                onChange={change}
                placeholder="Email"
                name="email"
                className=" h-[40px]  rounded-md border-2 border-black lg:w-[250px]"
                value={formvalues.email}
              />
            </div>
            <p className=" lg:text-[20px] text-red-500 lg:flex lg:justify-center lg:items-center">
              {formerrors.email}
            </p>
          </div>

          <div className=" mb-[20px] lg:mb-[25px]">
            <label className=" text-[20px] lg:text-[25px] lg:flex lg:justify-center lg:items-center">
              Password
            </label>

            <div className=" lg:flex lg:justify-center lg:items-center">
              <input
                type="password"
                onChange={change}
                placeholder="Password"
                name="password"
                className=" h-[40px]  rounded-md border-2 border-black lg:w-[250px]"
                value={formvalues.password}
              />
            </div>
            <p className=" lg:text-[20px] text-red-500 lg:flex lg:justify-center lg:items-center">
              {formerrors.password}
            </p>
          </div>

          <div className=" mb-[20px] mt-[20px] lg:mb-[25px]">
            <label className=" text-[20px] lg:text-[25px] lg:flex lg:justify-center lg:items-center">
              Mobile Number:
            </label>

            <div className=" lg:flex lg:justify-center lg:items-center">
              <input
                type="number"
                onChange={change}
                placeholder="Mobile Number"
                name="mobilenumber"
                className=" h-[40px]  rounded-md border-2 border-black lg:w-[250px]"
                value={formvalues.mobilenumber}
              />
            </div>
            <p className=" lg:text-[20px] text-red-500 lg:flex lg:justify-center lg:items-center">
              {formerrors.mobilenumber}
            </p>
          </div>
          <div className="cursor-pointer underline text-blue-500 lg:ml-[115px] mb-5 ">
            <Link to="/login">
              <span>Already have an account?</span>
            </Link>
          </div>
          <div className=" flex justify-center  lg:flex lg:justify-center lg:items-center">
            <button className=" text-[20px] h-[45px] w-[90px] border-2 border-blue-900 bg-blue-400 text-white lg:h-[40px] lg:w-[120px] lg:text-[25px] rounded-lg font-bold">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
