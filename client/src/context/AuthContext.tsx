import { createContext, useEffect, useReducer } from "react";
import { AuthContextInterface, authAction } from '../types/interfaces';

interface Props {
    children: React.ReactNode
}

const defaultState = {
    user: null,
    token: ''
}

export const AuthContext = createContext<AuthContextInterface<any>>(null!)

const authReducer = (state: typeof defaultState, action: authAction): any => {
    switch(action.type){
        case 'Login':
            return { ...state, ...action.payload };
        case 'logout': 
            return { user: null,  token: ''}
    }
}

const AuthContextProvider: React.FC<Props> = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, defaultState);
    useEffect(() => {
        if(localStorage.getItem('user') && localStorage.getItem('access_token')){
            dispatch({type: 'Login', payload: {
                user: JSON.parse(localStorage.getItem('user')!),
                token: localStorage.getItem('access_token')
            }})
        }
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;