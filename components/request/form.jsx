"use client";
import { postNewRegistration,checkMobileNumber,registrationDefault } from "./util";
import React, { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from 'next/navigation'; 

export default function RequestForm() {
  const [vital, setVital] = useState({type:'',message:''});
  const [formData, setFormData] = useState(registrationDefault);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }


  const handleAge = async (e) => { 
    const { days, months, years } = formData;
    let isDay = days != '' && days.length > 0;
    let isMonth = months != '' && months.length > 0;
    let isYear = years != '' && years.length > 0;
    let age = 0;
    if (isDay && isMonth && isYear) {
      const today = new Date();
      const birth = new Date(years, months, days);
       age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
    }
    setFormData({ ...formData, age: age, ageType: 'years' });
}


  const handleSubmit = async (e) => {
    e.preventDefault()
    let isValid = true

    if (!formData.firstname || !formData.lastname) {
      isValid = false
      toast.error("Please enter first name, last name and middle name.", { autoClose: 3000 })
      return
    }

    if (formData.age <= 0 || formData.ageType.length == 0  || formData.ageType == "") {
      if (formData.days.length == 0 || formData.months.length <= 0 || formData.years.length <=0) {
        isValid = false
        setVital({ type: 'error', message: 'Please enter a valid date of birth or age ' })
        return
      } else {
        handleAge();
      }
    }

    if (formData.gender.length === 0) {
      isValid = false;
      toast.error("select a  valid gender type", { autoClose: 3000 })
    }


    if (isValid) {
      const pushFormData = await postNewRegistration(formData);
      const { status, message, statusCode } = pushFormData;
      if (statusCode == 200 && status == "success") {
        toast.success(message, { autoClose: 3000 });
        setFormData(registrationDefault);
        setLoading(true);
        router.push('/request/billing');
      } else {
        toast.error(message, { autoClose: 3000 })
      }
    }
  }

  const validatemobile = async (value) => {
    setFormData({ ...formData, mobile: value }); // Update form data with the mobile number
  
    if (value.length === 10) {
      // If the length of the value is 10 (assuming it's a valid mobile number length)
      setFormData({ ...formData, mobile: value }); // Update form data again with the mobile number
      
      // Check if the mobile number exists asynchronously
      const isExist = await checkMobileNumber(value);
      const { status, exist, statusCode } = isExist;
  
      // If the mobile number exists, set an error message, else set success message
      if (statusCode === 200 && status === "success" && exist === true) {
        setVital({ type: 'error', message: 'Mobile number already exists' });
      } else {
        setVital({ type: 'success', message: '' });
      }
      return;
    } else {
      setVital({ type: 'error', message: 'Number must be 10 digits' });
    }
  };
  
  const validateEmail = (value) => {
    // Validate email format
    return /\S+@\S+\.\S+/.test(value)
  }

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-between">
        <div className={vital.type == "error" ? "alert alert-danger" : ""}>{vital.type == "error" && vital.message}</div>
      </div>
      {loading && <div className="loader"></div>}
      {!loading && (
        <form autoComplete="off" name="personalinformation" id="personalform" className='mx-2 my-2'>
          <fieldset className="grid grid-two">
            <legend>Personal Information</legend>
            <div className="form-row">
              <label>First Name </label>
              <input
                required
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                tabIndex={1}
                className="custom-input"
              />
            </div>
            <div className="form-row">
              <label>Last Name </label>
              <input
                required
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                tabIndex={2}
                className="custom-input"
              />
            </div>
            <div className="form-row">
              <label>Middle Name </label>
              <input
                type="text"
                name="middlename"
                value={formData.middlename}
                onChange={handleChange}
                required
                tabIndex={3}
                className="custom-input"
              />
            </div>
            <div className="form-row">
              <label>Email </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                tabIndex={4}
                className="custom-input"
                required
                title="Please enter a valid email address"
              />
            </div>
            <div>
              <label>Mobile Number </label>
              <div className="d-flex justify-content-between">
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={(e) => validatemobile(e.target.value)}
                  tabIndex={5}
                  maxLength={10}
                  minLength={10}
                  step={1}
                  className="custom-input"
                  required
                  title="Please enter a valid 10-digit mobile number"
                />
                <label>Number belongs to </label>
                <select className="custom-select" name="mobileownership" value={formData.mobileownership} onChange={handleChange}>
                  <option value="self">Self</option>
                  <option value="relative">Relative</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <label>Gender</label>
              <select className="custom-select" name="gender" value={formData.gender} onChange={handleChange} tabIndex={6}>
                <option>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label>Date of Birth </label>
              <div className="d-flex justify-content-around">
                <input
                  placeholder="dd"
                  type="number"
                  name="days"
                  value={formData.days}
                  onChange={handleChange}
                  tabIndex={7}
                  maxLength={2}
                  minLength={1}
                  max={31}
                  min={1}
                  className="custom-input"
                />
                <input
                  placeholder="mm"
                  type="number"
                  name="months"
                  value={formData.months}
                  onChange={handleChange}
                  tabIndex={8}
                  maxLength={2}
                  minLength={1}
                  max={12}
                  min={1}
                  className="custom-input mx-1"
                />
                <input
                  placeholder="yyyy"
                  type="number"
                  name="years"
                  value={formData.years}
                  onChange={handleChange}
                  tabIndex={9}
                  maxLength={4}
                  min={4}
                  className="custom-input"
                />
              </div>
            </div>
            <div>
              <label>Age </label>
              <div className="d-flex">
                <input type="number" name="age" value={formData.age} onChange={handleChange} tabIndex={10} className="custom-input" />
                <select className="custom-select mx-1" name="ageType" value={formData.ageType} onChange={handleChange} tabIndex={11}>
                  <option value="years">years</option>
                  <option value="months">months</option>
                  <option value="days">days</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <label>Occupation </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                tabIndex={12}
                className="custom-input"
              />
            </div>
            <div className="form-row">
              <label>Marital Status </label>
              <select className="custom-select" name="maritalstatus" value={formData.maritalstatus} onChange={handleChange} tabIndex={13}>
                <option value="married">Married</option>
                <option value="single">Single</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
            <div>
              <button
                tabIndex={14}
                type="button"
                onClick={(ev) => {
                  handleSubmit(ev)
                }}
                className="btn btn-sm btn-primary mt-3">
                Save and Continue
              </button>
            </div>
          </fieldset>
        </form>
      )}
    </>
  )
}
