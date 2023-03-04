const BASE_URL = "https://mynoteapi.herokuapp.com";

const GET = async (url, token = null) => {
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  try {
    const res = await fetch(BASE_URL + url, {
      method: "GET",
      headers,
    });
    if (res.status >= 400) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return {
      message: error,
    };
  }
};

const POST = async (url, body, token = null, type = "POST") => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  if (token) {
    myHeaders.append("Authorization", `Bearer ${token}`);
  }

  const requestOptions = {
    method: type,
    headers: myHeaders,
    body: JSON.stringify(body),
  };
  try {
    const res = await fetch(`${BASE_URL}${url}`, requestOptions);
    // console.log(res);
    if (res.status >= 400) {
      function ErrorObject() {
        this.statusError = res.status;
        this.text = res.statusText;
      }
      throw new ErrorObject();
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
};

const DELETE = async (url, token) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const options = {
    method: "DELETE",
    headers: myHeaders,
  };
  try {
    const promise = await fetch(`${BASE_URL}${url}`, options);
    if (promise.status >= 400) {
      function ErrorObject() {
        this.statusError = res.status;
        this.text = res.statusText;
      }
      throw new ErrorObject();
    }

    const res = await promise.json();
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//const PATCH = (url, body, token) => {};

export { POST, GET, DELETE };
