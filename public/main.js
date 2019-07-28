import "materialize-css";
import config from "./firebase.js";
import firebase from 'firebase/app';
import 'firebase/database';
firebase.initializeApp(config);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("add_dialogue").addEventListener("click", fChat);
});

function fChat(evt){
    let sDialogue = document.getElementById("item").value;
    document.getElementById("item").value = "";
    let sItemID = new Date().toISOString().replace(".", "_");
    let sTimestamp = new Date().toISOString().replace("T", " ").substring(0,16);
    firebase.database().ref('dialogues/' + sItemID).set({
        Dialogue: sDialogue,
        Timestamp: sTimestamp
    }).then(() => {
        console.log("inserted");
    });
}

firebase.database().ref('dialogues').on("value", snapshot => {
    // the database has changed
    let oDialogueItems = snapshot.val();
    let oDialogueList = document.getElementById("dialoguelist");
    console.log(oDialogueItems);
    oDialogueList.innerHTML = "";
    
    Object.keys(oDialogueItems).map((key) => {
        //we have an item here let's make a card for it
        let oDialogueItem = oDialogueItems[key];
        let oCard = document.createElement("div");
        oCard.className ="bubble";

        //card content
        let oCardContent = document.createElement("div");
        oCardContent.className = "col s12 row";
        oCardContent.innerHTML = "<span class=\"col s6\">" + oDialogueItem.Dialogue + "</span>";
        oCardContent.innerHTML += "<span class=\"col s6 small\">" + oDialogueItem.Timestamp + "</span>";
        //oCardContent.innerHTML = oDialogueItem.Dialogue + oDialogueItem.Timestamp + "</span>";

        oCard.append(oCardContent);

        //card action
        let oCardAction = document.createElement("div");
        oCardAction.className = "card-action";
        oCardAction.id = key;

        oCard.append(oCardAction);

        oDialogueList.append(oCard);
    });
});