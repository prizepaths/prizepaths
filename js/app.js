<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAUB149FSoe2esB6-4mBCClXrBucbsbq5E",
    authDomain: "prizepaths.firebaseapp.com",
    projectId: "prizepaths",
    storageBucket: "prizepaths.firebasestorage.app",
    messagingSenderId: "908497618587",
    appId: "1:908497618587:web:43f761c6ab1ac71ef3a83e",
    measurementId: "G-YJTMSQZ6NL"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>