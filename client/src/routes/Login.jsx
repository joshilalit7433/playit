import React, { useEffect, useState } from "react";

export default function Login() {
  const initialvalues = { username: "", email: "", password: "" };
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
    if (!values.username) {
      errors.username = "username is required";
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

    return errors;
  };

  return (
    <>
      <div className=" lg:flex lg:justify-center lg:items-center lg:mt-[100px] ">
        <form
          onSubmit={handlesubmit}
          className=" lg:h-[500px] lg:w-[500px] border-2 border-black lg:pt-[50px]"
        >
          <p>
            {Object.keys(formerrors).length === 0 && submit ? (
              <div>Signed in Successfully</div>
            ) : (
              <div>{JSON.stringify(formvalues)}</div>
            )}
          </p>

          <div className="lg:mb-[25px]   ">
            <label className="lg:text-[25px] lg:flex lg:justify-center lg:items-center ">
              Username:
            </label>

            <div className=" lg:flex lg:justify-center lg:items-center">
              <input
                type="text"
                onChange={change}
                placeholder="Username"
                name="username"
                className="border-2 border-black lg:w-[250px]"
                value={formvalues.username}
              />
            </div>
            <p className=" lg:text-[20px] lg:flex lg:justify-center lg:items-center text-red-500">
              {formerrors.username}
            </p>
          </div>

          <div className="lg:mb-[25px]">
            <label className="lg:text-[25px] lg:flex lg:justify-center lg:items-center">
              Email:
            </label>

            <div className=" lg:flex lg:justify-center lg:items-center">
              <input
                type="email"
                onChange={change}
                placeholder="Email"
                name="email"
                className="border-2 border-black lg:w-[250px]"
                value={formvalues.email}
              />
            </div>
            <p className=" lg:text-[20px] text-red-500 lg:flex lg:justify-center lg:items-center">
              {formerrors.email}
            </p>
          </div>

          <div className="lg:mb-[25px]">
            <label className="lg:text-[25px] lg:flex lg:justify-center lg:items-center">
              Password
            </label>

            <div className=" lg:flex lg:justify-center lg:items-center">
              <input
                type="password"
                onChange={change}
                placeholder="Password"
                name="password"
                className="border-2 border-black lg:w-[250px]"
                value={formvalues.password}
              />
            </div>
            <p className=" lg:text-[20px] text-red-500 lg:flex lg:justify-center lg:items-center">
              {formerrors.password}
            </p>
          </div>

          <div className=" lg:flex lg:justify-center lg:items-center">
            <button className="border-2 border-blue-900 bg-blue-400 text-white lg:h-[40px] lg:w-[120px] lg:text-[25px] rounded-lg font-bold">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
