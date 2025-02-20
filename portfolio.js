let tablinks = document.getElementsByClassName('tab-links');
let tabcontents = document.getElementsByClassName('tab-content');

function opentab(tabname, event){
    for(const tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(const tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

var sidemenu = document.getElementById("sidemenu");

function openmenu(){
    sidemenu.style.right = "0";
}

function closemenu(){
    sidemenu.style.right = "-200px";
} 

const form = document.querySelector("form[name='submit-to-google-sheet']");
const msg = document.getElementById("msg");
const scriptURL = 'https://script.google.com/macros/s/AKfycbxh7ke2pcA3iKoO1x59cKtYOitO3S_hpkX6YhQXD9laZD2sILEUgg5gIGqXoT7k1qaFUA/exec';

form.addEventListener("submit", function (e) {
    e.preventDefault(); // STOP FORM SUBMISSION FIRST

    let name = document.querySelector("input[name='Name']");
    let email = document.querySelector("input[name='Email']");
    let message = document.querySelector("textarea[name='Message']");

    // ✅ Improved email regex
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let isValid = true; // Assume form is valid

    if (!name.value.trim()) {
        name.setCustomValidity("Please enter your name.");
        name.reportValidity();
        isValid = false;
    } else {
        name.setCustomValidity("");
    }

    // ✅ Reset email error before checking
    email.setCustomValidity(""); 

    if (!email.value.trim()) {
        email.setCustomValidity("Please enter your email address.");
        email.reportValidity();
        isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        email.setCustomValidity("Please enter a valid email address (e.g., example@example.com).");
        email.reportValidity();
        isValid = false;
    } else {
        email.setCustomValidity(""); // Fix: Reset validation dynamically when the email is valid
    }

    if (!message.value.trim()) {
        message.setCustomValidity("Please enter your message.");
        message.reportValidity();
        isValid = false;
    } else {
        message.setCustomValidity("");
    }

    //  **Stop submission if validation fails**
    if (!isValid) {
        return; // Stop execution
    }

    // ✅ **If all validation passes, submit the form via fetch**
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
        msg.innerHTML = 'Message sent successfully';
        setTimeout(() => { msg.innerHTML = ''; }, 5000);
        form.reset();
    })
    .catch(error => console.error('Error!', error.message));
});

document.querySelector("input[name='Email']").addEventListener("input", function () {
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(this.value.trim())) {
        this.setCustomValidity(""); // ✅ Clears error if the email becomes valid
    }
});

// **Fix: Listen for input in the message field and reset errors**
document.querySelector("textarea[name='Message']").addEventListener("input", function () {
    if (this.value.trim().length > 0) {
        this.setCustomValidity(""); // ✅ Clears error if the message field is filled
    }
});

// form.addEventListener('submit', e => {
//     e.preventDefault()
//     fetch(scriptURL, { method: 'POST', body: new FormData(form)})
//     .then(response => {
//         msg.innerHTML = 'Message sent successfully';
//         setTimeout(function(){
//             msg.innerHTML = '';
//         },5000);
//         form.reset();
//     })
//     .catch(error => console.error('Error!', error.message))
// });