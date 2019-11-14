
function handleErrors(response) {
  if (!response.ok) { 
      console.log(response);
      throw Error(response.statusText);
  }
  return response;
}

// Register a user
function register( firstname, lastname, email, password) {
  fetch(
    'https://nddcbackend.herokuapp.com/api/user/register',
    { 
      method: 'POST', 
      body: {
        firstname,
        lastname,
        email,
        password
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  .then((res) => 
    // handle data that comes in
    console.log(res)
  ).catch((err) => console.log(err))
}

register('John', 'Doe', 'doe@gmail.com', '1234');