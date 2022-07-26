
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, setDoc, doc, onSnapshot } from 'firebase/firestore';
import { GameState, RoundState, YatzySet } from './YatzySet';

const fbapp = initializeApp({
    apiKey: "AIzaSyDXKRP_mnNEJF5wkWkZ0fGFmPUAIZvE7Js",
    authDomain: "mogens-357414.firebaseapp.com",
    projectId: "mogens-357414",
    storageBucket: "mogens-357414.appspot.com",
    messagingSenderId: "290609839228",
    appId: "1:290609839228:web:94a29c55cb630c9df49df9"
})

export const db = getFirestore(fbapp);

export function GetRemoteState(callback: (game: GameState) => void) {
    // console.log("Getting from fire");
    const unsub = onSnapshot(doc(db, "YatzySets", "shared"), (doc) => {
        const data = doc.data();
        if (data === undefined){
            return;
        }
        const state = JSON.parse(data.state) as GameState;
        console.log("Current state: ", state);
        callback(state);

        // const state = Array<RoundState[]>(0);
        // Object.keys(data).forEach((key) => {
        //     const subdata = data[key]
        //     const subarray: RoundState[] = [];
        //     Object.keys(subdata).forEach((subkey) => {
        //         var roundState = subdata[subkey] as RoundState;
        //         subarray.push(roundState);
        //     });
        //     state.push(subarray);
        // });
        // console.log(state);
    
        // callback(state);
        //var allRounds: RoundState[][] = data;
        //console.log(allRounds);
    });

    
        
    console.log("Done with fire");
}

export async function StoreRemoteState(state: GameState) {
    await setDoc(doc(db, "YatzySets", "shared"), { state: JSON.stringify(state) });
}



