document.addEventListener('DOMContentLoaded', function () {
    var htmlContent = `
<div class="centered-container">
    <button class="button is-primary" id="open-modal-btn-nano-payments">Pay with Nano-Payments</button>
</div>
    
<div class="modal" id="email-modal-nano-payments">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Get updates on nano-payment option</p>
            <button class="delete" aria-label="close" id="close-modal-btn"></button>
        </header>
        <section class="modal-card-body">
            <div class="content-wrapper">
                <div class="columns is-centered">
                    <div class="column is-6">
                        <div class="field">
                            <div class="control">
                                <input class="input is-large" name="email" type="email" id="email-nano-payments" placeholder="Enter your email address">
                            </div>
                        </div>
                        <div class="field">
                            <div class="control has-text-centered">
                                <button class="button is-primary" id="form-submit">Register interest</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="snackbar-success-nano-payments">Thank you!</div>
            <div id="snackbar-fail-nano-payments">Invalid email address</div>
        </section>
        
    </div>
</div>`;

function loadFirebaseScripts(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    document.head.appendChild(script);
}

function loadScriptsSequentially(scriptsToLoad, currentIndex, callback) {
    if (currentIndex < scriptsToLoad.length) {
        loadFirebaseScripts(scriptsToLoad[currentIndex], function() {
            console.log(scriptsToLoad[currentIndex] + ' loaded successfully.');
            loadScriptsSequentially(scriptsToLoad, currentIndex + 1, callback);
        });
    } else if (typeof callback === "function") {
        callback();
    }
}

var scriptsToLoad = [
    "https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js",
    "https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js",
    "https://www.gstatic.com/firebasejs/7.8.0/firebase-auth.js"
];

loadScriptsSequentially(scriptsToLoad, 0, function() {
    // All scripts have loaded, now initialize Firebase
    initializeFirebase();
});

document.body.insertAdjacentHTML('beforeend', htmlContent);
// Initialize Firebase in your existing script.
// Add this JavaScript to handle the modal opening and closing.
document.getElementById('open-modal-btn-nano-payments').addEventListener('click', function() {
    document.getElementById('email-modal-nano-payments').classList.add('is-active');
});

document.getElementById('close-modal-btn').addEventListener('click', function() {
    document.getElementById('email-modal-nano-payments').classList.remove('is-active');
});

function initializeFirebase() {
    const firebaseEmailConfig = {
        apiKey: "AIzaSyBro8QN3zyJwyo92lYUMPwsyRVPLLGOTcs",
        authDomain: "dhali-prod.firebaseapp.com",
        projectId: "dhali-prod",
        storageBucket: "dhali-prod.appspot.com",
        messagingSenderId: "1042340549063",
        appId: "1:1042340549063:web:3dc69cffe6d3c0746189e2",
    };
    var appEmail = firebase.initializeApp(firebaseEmailConfig);
    var dbEmail = firebase.firestore(appEmail)
    const collectionEmails = dbEmail.collection("emails-from-ads")
    let submitButtonEmails = document.getElementById("form-submit")
    submitButtonEmails.addEventListener("click", (e) => {
        e.preventDefault()
        let email = document.getElementById("email-nano-payments").value
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(mailformat)) {
        collectionEmails.doc().set(
            {
            email: email,
            date: new Date(),
            }
        )
        document.getElementById("email-nano-payments").value = ""
        var x = document.getElementById("snackbar-success-nano-payments");

        x.className = "show";

        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        }
        else {

        var x = document.getElementById("snackbar-fail-nano-payments");

        // Add the "show" class to DIV
        x.className = "show";

        // After 3 seconds, remove the show class from DIV
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        }
  })}
});
