
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { GetIpAddress } from './IpAddress';
import { GameState, RoundState } from './YatzySet';

const fbapp = initializeApp({
    apiKey: "AIzaSyDXKRP_mnNEJF5wkWkZ0fGFmPUAIZvE7Js",
    authDomain: "mogens-357414.firebaseapp.com",
    projectId: "mogens-357414",
    storageBucket: "mogens-357414.appspot.com",
    messagingSenderId: "290609839228",
    appId: "1:290609839228:web:94a29c55cb630c9df49df9"
})

const db = getFirestore(fbapp);
var documentName = "empty";
GetIpAddress().then(s => documentName = s);
var unsub: Unsubscribe;

export function ListenToRemoteState(callback: (game: GameState) => void) {
    console.log("Group is IP");     
    const roundState: RoundState = {
        cubes: Array<number>(0),
        scratched: false
    }  
    const newState: GameState = {
        names: Array<string>(6).fill("Spiller"),
        rounds: Array(6).fill(Array(17).fill(roundState)),
        currentPlayer: 0,
        currentRound: 0
    };
    console.log("New state: ", newState);
    GetIpAddress().then(documentName => subscribe(documentName, newState, callback));
}

export function ListenToRemoteStateUpdate(callback: (game: GameState) => void, currentState: GameState, groupname: string ) {
        console.log("Group is: ", groupname);
        documentName = groupname;
        subscribe(groupname, currentState, callback );
}

function subscribe(documentName: string, currentState: GameState, callback: (game: GameState) => void){
        var d = doc(db, "YatzySets", documentName);
        if (unsub !== undefined){
            console.log("Already subscribed");
            unsub();
        }
        unsub = onSnapshot(d, (doc) => {
            const data = doc.data();    
            if (data === undefined) {
                console.log("No existing document");
                
                callback(currentState);
                return;
            }
            console.log("Existing document: ", doc);
            const state = JSON.parse(data.state) as GameState;
            callback(state);

        });
}

export async function StoreRemoteState(state: GameState) {
    await setDoc(doc(db, "YatzySets", documentName), { state: JSON.stringify(state) });
}



