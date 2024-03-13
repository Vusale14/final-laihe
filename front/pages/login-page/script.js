const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');

form.addEventListener('submit', e => {
    e.preventDefault();
    console.log("submit");
     validateInputs();
});

form.addEventListener('keyup', e => {
    e.preventDefault();
    console.log("submit");
     validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('p');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccsess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('p');

    errorDisplay.remove;
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidPassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
    return re.test(password);
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if(usernameValue === '') {
        setError(username, 'Password Required*');
    }else {
        setSuccsess(username);
    }

    if (passwordValue === '') {
        setError(password, 'Password Required*');
    }else if (!isValidPassword(passwordValue)) {
        setError(password, 'Something went wrong. Please try again');
    }else {
        setSuccsess(password);
    }
};




const formElement = document.querySelector('#search');
const emailElement = document.querySelector('#email');

formElement.addEventListener('submit', e => {
    e.preventDefault();
    console.log("submit");
     validateInputs();
});

const ErrorSet = () => {

    Toastify({
      text: "Unsuccessfully",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "right",
      stopOnFocus: true, 
      style: {
        background: "red",
      },
    }).showToast();
}

const SuccsessSet = () => {

    Toastify({
      text: "Successfuly ",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top",
      position: "right",
      stopOnFocus: true, 
      style: {
        background: "green",
      },
    }).showToast();
}

const isValidEmail = email => {
    const re =  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
}

const validateInput = () => {
    const emailValue = email.value.trim();

    if(emailValue === '') {
        ErrorSet( 'Password Required*');
    }else if (!isValidEmail(emailValue)) {
        ErrorSet('Something went wrong. Please try again');
    }else {
        setSuccsess(email);
    }
};


const accountCreateForm = document.getElementById('form');
const usernameElement = document.getElementById('username');
const passwordElement = document.getElementById('password');

accountCreateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = usernameElement.value;
    const password = passwordElement.value;

    if(!username || !password) {
        createToast("Username, email and password are required", "error");
        return;
    }

    const account = {
        username,
        password,
    };
    createAccount(account);
});

async function createAccount(account) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(account)
    });
    console.log(response);
    const data = await response.json();
    if(response.status!==201) {
        createToast(data.error, "error");
        return;
    }

    createToast("Account successfully created", "success");
}

function resetFields() {
    usernameElement.value = "";
    emailElement.value = "";
    passwordElement.value = "",
    confirmPasswordElement.value = ""
}

function createToast(text,type) {
    Toastify({
        text,
        duration: 1000,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true,
        style: {
         background: type === "success" ? "green" : "red",
         color: "white",
        },
      }).showToast();
}