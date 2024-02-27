/**
   * Sends an HTTP request to the specified endpoint and returns the response as JSON.
   * 
   * @param {string} endpoint - The endpoint URL to send the request to.
   * @returns {Promise<object>} - The response from the server as JSON.
   */
export async function customFetch(endpoint) {
  try {
    let response = await fetch(`${process.env.BASEURL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        mode: 'no-cors',
      },
    });

    const source = await response.json();
    const { status, message } = source
    if (status == 401 && message == 'Unauthorized') {
      window.location.href = '/authentication/login'
    } else {
      return source
    }
  } catch (err) {
    console.log(err);
  }
}


export async function customPost(endpoint, method, data) {
  /**
   * Sends a POST request to a specified endpoint with the provided data.
   * Includes necessary headers and authorization token.
   * Parses the response and checks for a specific status and message.
   * If the status is 401 and the message is "Unauthorized", redirects the user to the login page.
   * Otherwise, returns the parsed response.
   * 
   * @param {string} endpoint - The endpoint to send the POST request to.
   * @param {string} method - The HTTP method to use for the request (e.g., "POST", "PUT").
   * @param {object} data - The data to send in the request body.
   * @returns {Promise<object>} - The parsed response from the POST request.
   */
  let response = await fetch(`${process.env.BASEURL}/${endpoint}`, {
    method: method,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      mode: 'no-cors',
    },
    body: JSON.stringify(data),
  });
  let datasource = await response.json();
  const { status, message } = datasource;

  if (status == 401 && message == 'Unauthorized') {
    window.location.href = '/authentication/login'
  } else {
    return datasource
  }
}

export async function validateFormData(
  data,
  allrequired,
  requiredFields = [],
  endpoint,
  callback,
  updateState
) {
  /**
   * Validates form data before sending it to the server.
   * 
   * @param {object} data - The form data to be validated.
   * @param {boolean} allrequired - A flag indicating whether all fields are required or not.
   * @param {array} [requiredFields=[]] - An optional array of field names that are required.
   * @param {string} endpoint - The endpoint to send the form data to.
   * @param {function} callback - A callback function to handle the response from the server.
   * @param {boolean} updateState - update state function , optional
   * @returns {void}
   */

  const isObject = typeof requiredFields === "object";
  const requiredLen = requiredFields.length;

  async function forwardToServer() {
    let response = await customPost(endpoint, "POST", data);
    callback(response);
    if (updateState) {
      updateState
    }
  }
  // if all the fields are not required , we pass data to server
  if (!allrequired) {
    if (isObject && requiredLen > 0) {
      // we check to ensure the required fields are not empty
      const passChecked = [];
      // loop through the data
      for (let i = 0; i < requiredLen; i++) {
        for (const [key, value] of Object.entries(data)) {
          if (key === requiredFields[i]) {
            if (value == "" || value == null || value == undefined) {
              passChecked.push(key);
            }
          }
        }
      }
      // if required fields is e,pty pass checked array increase beyond 0
      if (passChecked.length > 0) {
        alert(`${passChecked} is required`);
        // throw new Error(`${passChecked} is required`)
      }

      if (passChecked.length == 0) {
        forwardToServer();
      }
    } else {
      alert("some required fields are empty");
    }
  }

  if (allrequired) {
    const emptyFileds = Object.values(data).filter((item, index) => {
      return new String(item).length == 0;
    }).length;
    // we need all fields filled
    if (emptyFileds === 0) {
      forwardToServer();
    } else {
      alert("All Fields Required");
    }
  }
}

export const getDataAndUpdateState = async function (setfxn, endpoint, returner, loader = null) {
  try {
    if (loader) loader(true);
    const getResponse = await customFetch(endpoint);
    const { statusCode, status, result } = getResponse;
    if (statusCode == 200) {
      if (returner) {
        return result
      } else {
        setfxn(result)
      }
    }
    if (loader) loader(false);
  } catch (err) {
    if (loader) loader(false);
    alert("something went wrong");
  }
}


export const internationCurrencyFormat = (num) => {
  const c = new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS'
  }).format(num);
  return c;
}

