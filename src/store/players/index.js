import { createSlice } from '@reduxjs/toolkit'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../config/firebase'

export const get_player = () => {
    return (dispatch) => {
        const dbRef = collection(db, 'users')
        getDocs(dbRef)
            .then((snapshot) => {
                let result = []
                snapshot.docs.forEach((doc) => {
                    result.push({ ...doc.data(), id: doc.id })
                })
                dispatch(playerData(result))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}


export const get_leader_board = () => {
    return (dispatch) => {
        const q = query(collection(db, "gamepoint"), orderBy("totalpoint", "desc"))
        getDocs(q)
            .then((snapshot) => {
                let result = []
                snapshot.docs.forEach((doc) => {
                    result.push({ ...doc.data(), id: doc.id })
                })
                // console.log(result);
                dispatch(boardData(result))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

const initialState = {
    player:[],
    loadingPlayer:true,
    leaderBoard:[],
    loadingBoard:true,
}

export const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        playerData(state,action){
            state.player = action.payload
            state.loadingPlayer = false
        },
        boardData(state,action){
            state.leaderBoard = action.payload
            state.loadingBoard = false
        }
    },
});

export const { playerData ,boardData } = playerSlice.actions;
export default playerSlice.reducer;
