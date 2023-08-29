import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age,setAge]=useState('');
  const [phoneNumber,setPhoneNumber]=useState('');

  const navigate= useNavigate();

  const addCustomer = (e) => {
    e.preventDefault();

    // Validation
    if (firstName.trim() === '' || lastName.trim() === '') {
      alert("First Name and Last Name cannot be blank.");
      return;
    }

	if(!firstName.match(/^[a-zA-Z]+$/)){
		alert("no numbers allowed in first name")
		return;
	}

	if(!lastName.match(/^[a-zA-Z]+$/)){
		alert("no numbers allowed in last name")
		return;
	}

    if (!email.match(/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z]{2,}$/)) {
      alert("Invalid email format. Please enter a valid email address");
      return;
    }

	if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
		alert("password should have atleast 1 LowerCase,1 UpperCase, 1 Digit,1 special character")
		return;
	}

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please make sure they match before submitting.");
      return;
    }

    const customer = {
      firstName,
      lastName,
      age,
      email,
      password,
      confirmPassword,
      phoneNumber
    }

    // Additional checks for age and phone number

    if (customer.age < 18) {
      alert("You are not eligible to buy this item, please enter a valid age");
      return;
    }

    if (customer.phoneNumber.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    axios.post("http://localhost:8080/api/auth/register",customer)
      .then(response => {
        alert("Customer added successfully");
        navigate('/login');
      })
      .catch(error => {
        alert("Error: " + error.message);
        console.log("error",error.response);
      });
  }

  // Handle input changes
  const handleFirstNameChange = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <div className="font-mono bg-gray-400">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      value={firstName}
                      placeholder="First Name"
                      onChange={handleFirstNameChange}
                    />
                  </div>
                  <div className="md:ml-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="lastName"
                      type="text"
                      value={lastName}
                      placeholder="Last Name"
                      onChange={handleLastNameChange}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={handleEmailChange}
                  />
                </div>
                {/* Age and Phone no */}
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                      Age
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="age"
                      type="number"
                      value={age}
                      placeholder="e.g. 10"
                      onChange={handleAgeChange}
                    />
                  </div>
                  <div className="md:ml-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="c_password">
                      Phone Number
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="phone_number"
                      type="tel"
                      pattern="[0-9]{10}"
                      value={phoneNumber}
                      placeholder="1234567890"
                      onChange={handlePhoneNumberChange}
                    />
                  </div>
                </div>

                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      value={password}
                      placeholder="******************"
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="md:ml-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="c_password">
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="c_password"
                      type="password"
                      value={confirmPassword}
                      placeholder="******************"
                      onChange={handleConfirmPasswordChange}
                    />
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={addCustomer}
                  >
                    Register Account
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="/login"
                  >
                    Already have an account? Login!
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;