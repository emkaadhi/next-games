import { createSlice } from '@reduxjs/toolkit'
import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { db } from '../../config/firebase'

export const get_games = () => {
    return (dispatch) => {

        const dbRef = collection(db, 'games')
        getDocs(dbRef)
            .then((snapshot) => {
                let result = []
                snapshot.docs.forEach((doc) => {
                    result.push({ ...doc.data(), id: doc.id })
                })
                dispatch(gamesData(result))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const get_game_board = (id) => {
    return (dispatch) => {
        const q = query(collection(db, 'gamestats'), where('playerId','==',id))
        getDocs(q)
            .then((snapshot) => {
                let result = []
                snapshot.docs.forEach((doc) => {
                    result.push({ ...doc.data(), id: doc.id })
                })
                // console.log(result);
                dispatch(gamesBoard(result))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const add_game = (data) => {
    return (dispatch) => {
        const gameRef = collection(db, 'gamestats')
        getDocs(gameRef)
            .then(() => {
                let newGameStat = {
                    playerId: data.playerId,
                    point: data.score,
                    playCount: data.counter,
                    userWin: data.userWin,
                    userLoss: data.userLoss,
                    userDraw: data.userDraw,
                    name:data.name,
                    avatar:data.avatar,
                    createdAt: serverTimestamp()
                }
                console.log(newGameStat);
                addDoc(gameRef, newGameStat)
                dispatch(addGameData(newGameStat))
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

const initialState = {
    games:[],
    isLoadingGames:true,
    gamesBoard:[],
    isloadingGameBoard:true,
    addGames:[],
    addLoadingGameStats:true
}

export const gamesSlice = createSlice({
    name: "games",
    initialState,
    reducers: {
        gamesData(state,action){
            state.games = action.payload
            state.isLoadingGames = false
        },
        gamesBoard(state,action){
            state.gamesBoard = action.payload
            state.isloadingGameBoard = false
        },
        addGameData(state,action){
            state.addGameData = action.payload
            state.addLoadingGameStats = false
        },
    },
});

export const { gamesData ,gamesBoard,addGameData } = gamesSlice.actions;
export default gamesSlice.reducer;
