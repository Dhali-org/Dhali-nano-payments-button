var NanoPayments = (function() {

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    var _UUID = generateUUID();

    var htmlContent = `        
    <div class="modal" id="email-modal-nano-payments">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Get updates on nano-payment option</p>
                <button class="delete" aria-label="close" id="close-modal-btn" onclick="NanoPayments.closeModal()"></button>
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
                                    <button class="button is-primary" id="form-submit-nano-payments"><strong>Register interest</strong></button>
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

    function loadBulma(href) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
    
        document.head.appendChild(link);
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

        var hostname = window.location.hostname;
        var rootUrl = hostname.split('.')[0];

        const collectionEmails = dbEmail.collection("emails-from-ads")
        if (rootUrl == "")
        {
            rootUrl = "default"
        }
        console.log("rootUrl: " + rootUrl)
        const subCollection = collectionEmails.doc(rootUrl).collection("emails");

        subCollection.doc(_UUID).set(
            {
                date: new Date(),
            }
        )

        let submitButtonEmails = document.getElementById("form-submit-nano-payments")
        submitButtonEmails.addEventListener("click", (e) => {
            e.preventDefault()
            let email = document.getElementById("email-nano-payments").value
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (email.match(mailformat)) {
                subCollection.doc(_UUID).update(
                {
                    email: email,
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

    function openModal() {
        initializeFirebase();
        document.getElementById('email-modal-nano-payments').classList.add('is-active');
    }

    function closeModal() {
        document.getElementById('email-modal-nano-payments').classList.remove('is-active');
    }

    var scriptsToLoad = [
        "https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js",
        "https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js",
        "https://www.gstatic.com/firebasejs/7.8.0/firebase-auth.js"
    ];

    function init() {

        document.addEventListener('DOMContentLoaded', function () {


            loadScriptsSequentially(scriptsToLoad, 0, function() {});

            loadBulma("https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css");

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
        });
    }

    return {
        init: init,
        openModal: openModal,
        closeModal: closeModal
    };
})();

NanoPayments.init();