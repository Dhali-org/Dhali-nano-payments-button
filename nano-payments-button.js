var NanoPayments = (function() {
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
                                    <button class="button is-primary" id="form-submit-nano-payments">Register interest</button>
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
        let submitButtonEmails = document.getElementById("form-submit-nano-payments")
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

    var scriptsToLoad = [
        "https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js",
        "https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js",
        "https://www.gstatic.com/firebasejs/7.8.0/firebase-auth.js"
    ];

    function init() {

        document.addEventListener('DOMContentLoaded', function () {


        loadScriptsSequentially(scriptsToLoad, 0, function() {
            // All scripts have loaded, now initialize Firebase
            initializeFirebase();
        });

        document.head.insertAdjacentHTML('beforeend', `
            <style>
                .centered-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                }
                .modal {
                    display: none;
                }
                .modal.is-active {
                    display: flex;
                }
                #snackbar-success-nano-payments, #snackbar-fail-nano-payments {
                    visibility: hidden;
                    min-width: 250px;
                    margin-left: -125px;
                    background-color: #333;
                    color: #fff;
                    text-align: center;
                    border-radius: 2px;
                    padding: 16px;
                    position: fixed;
                    z-index: 1;
                    left: 50%;
                    bottom: 30px;
                    font-size: 17px;
                }

                #snackbar-success-nano-payments.show, #snackbar-fail-nano-payments.show {
                    visibility: visible;
                    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
                    animation: fadein 0.5s, fadeout 0.5s 2.5s;
                }

                @-webkit-keyframes fadein {
                    from {bottom: 0; opacity: 0;}
                    to {bottom: 30px; opacity: 1;}
                }

                @keyframes fadein {
                    from {bottom: 0; opacity: 0;}
                    to {bottom: 30px; opacity: 1;}
                }

                @-webkit-keyframes fadeout {
                    from {bottom: 30px; opacity: 1;}
                    to {bottom: 0; opacity: 0;}
                }

                @keyframes fadeout {
                    from {bottom: 30px; opacity: 1;}
                    to {bottom: 0; opacity: 0;}
                }
            </style>
        `);

        document.body.insertAdjacentHTML('beforeend', htmlContent);
        // Initialize Firebase in your existing script.
        // Add this JavaScript to handle the modal opening and closing.
        document.getElementById('open-modal-btn-nano-payments').addEventListener('click', function() {
            document.getElementById('email-modal-nano-payments').classList.add('is-active');
        });

        document.getElementById('close-modal-btn').addEventListener('click', function() {
            document.getElementById('email-modal-nano-payments').classList.remove('is-active');
        });


        });
    }

    return {
        init: init
    };
})();

NanoPayments.init();