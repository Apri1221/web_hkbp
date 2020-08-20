
<!-- Firebase JS CDN -->
    <!-- <script src="https://www.gstatic.com/firebasejs/7.17.2/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.17.2/firebase-firestore.js"></script> -->

        // Your web app's Firebase configuration
        // let firebaseConfig = {
        //     apiKey: "AIzaSyC8sOPhPviWiab6O19iNdVo2kc9PoRMCxo",
        //     authDomain: "hkbp-pbulan.firebaseapp.com",
        //     databaseURL: "https://hkbp-pbulan.firebaseio.com",
        //     projectId: "hkbp-pbulan",
        //     storageBucket: "hkbp-pbulan.appspot.com",
        //     messagingSenderId: "883338731802",
        //     appId: "1:883338731802:web:93354e0f924ed417ca8ca3",
        //     measurementId: "G-KX4CGXNV85"
        // };

        // function sendCrashReport(msg, request) {
        //     // Initialize Firebase
        //     let app = firebase.initializeApp(firebaseConfig);
        //     // using db
        //     let db = firebase.firestore(app);
        //     const {
        //         serverTimestamp
        //     } = firebase.firestore.FieldValue;

        //     db.collection("laporan_kesalahan").add({
        //             pesan: msg,
        //             permintaan: request,
        //             tanggal: serverTimestamp()
        //         })
        //         .then(docRef => console.log("Sending crash, ID: ", docRef.id))
        //         .catch(e => console.error("Fail sending crash report: ", e));
        // }