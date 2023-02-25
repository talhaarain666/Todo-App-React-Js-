// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-analytics.js";
import { getDatabase, ref, push, set, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8u3OhRdYhQYLgg7nQvnsANEdM_Cgdb4Y",
    authDomain: "todo-app-with-firebase-a2c49.firebaseapp.com",
    projectId: "todo-app-with-firebase-a2c49",
    storageBucket: "todo-app-with-firebase-a2c49.appspot.com",
    messagingSenderId: "148031223868",
    appId: "1:148031223868:web:55cb28a12abc0f164b6b39",
    measurementId: "G-X1CYSEEB29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const dbRef = ref(db, 'Todo');

//  =======================================  MY WORK   ============================================










window.addNote = function () {



    var obj = {
        // title: "NOTE",

    }

    obj.desc = document.getElementById("noteInput").value;


    const postListRef = ref(db, 'Todo');
    const newPostRef = push(postListRef);
    obj.id = newPostRef.key;
    set(newPostRef, obj)
        .then(function () {
            console.log("success");
        })
        .catch(function (err) {
            console.log(err);
        });



    noteInput.value = '';


}


window.renderArr = function (newarr) {
    var displayNote = document.getElementById("displayNote")
    displayNote.innerHTML="";

    newarr.forEach(function (e) {

        displayNote.innerHTML += `<li class="lightyellow darkpurpletxt fs-5 px-3 py-2 my-2 rounded shadow cstm ">
    ${e.desc}
    <span onclick="editNote('${e.id}')" class="btn darkpurple lightyellowtxt ms-3 me-2 editHover ">Edit</span>
    <span onclick="dltNote('${e.id}')" class="btn btn-dark mx-2">Delete</span>
    </li>`
    })

    // ================ Delete Button ==================
    window.dltNote = function (elemId) {

        remove(ref(db, "Todo/" + elemId), {

        });

    }

    // ================ Edit Button ==================
    window.editNote = function (elemid) {

     var editVal = prompt("Edit Todo");
     update(ref(db,"Todo/" + elemid),{
         desc:editVal
     }) 

    }


}


window.dltAll = function () {
    remove(ref(db, "Todo"), {

    });

}


onValue(
    dbRef,
    function (snapshot) {
        var arr = [];
        displayNote.innerHTML = ''
        snapshot.forEach(function (childSnapshot) {
            arr.push(childSnapshot.val());
            renderArr(arr);
            // ...
        });
    },
    {
        onlyOnce: false,
    }
);
