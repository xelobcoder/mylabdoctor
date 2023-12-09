const baseUrl = 'http://localhost:5000/api/v1/';

export const customFetch = async (url) => {
  const response = await fetch(baseUrl + url);
  const data = await response.json();
  return data;
}


export const customPost = async (url, data) => {
  const response = await fetch(baseUrl+url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const responseData = await response.json();
  return responseData;
}

export const postNewRegistration = async (data) => { 
  const response = await customPost(`register`,{personalInformation: data});
  return response;
}

export const checkMobileNumber = async (mobileNumber) => { 
  const response = await customFetch(`register/checkmobile?mobileno=${mobileNumber}`);
  return response;
}


export const registrationDefault = {
  firstname: "",
    lastname: "",
    middlename: "",
    email: "",
    mobile: "",
    gender: "",
    age: "",
    ageType: "",
    days: "",
    months: "",
    years: "",
    occupation: "",
    maritalstatus: "",
    mobileownership: "self",
}

