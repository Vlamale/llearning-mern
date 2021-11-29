import { combineReducers } from "redux";
import userReducer from "./userReducer/userReducer";

const rootReducer = combineReducers({
    user: userReducer
})



export type RootState = ReturnType<typeof rootReducer>

export default rootReducer