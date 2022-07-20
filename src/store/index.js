import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users'
import profileReducer from './profile';
import playerReducer from './players';
import gameReducer from './games';

export const store = configureStore({
    
    reducer: {
        user: userReducer,
        profile: profileReducer,
        player:playerReducer,
        games:gameReducer
    }, middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});


