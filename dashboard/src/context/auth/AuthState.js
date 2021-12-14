
import {useReducer} from 'react'
import {EMP_LOGIN, EMP_REGISTER,EMPLOG_SUCCESS,EMPLOG_Fail} from '../types'
import axios from 'axios'
import authReducer from './authReducer'
import authContext from './authContext'
const AuthState = (props)=>{
    const initialState = {
        user: 'ABC',
        role: '',
        authenticated: false,
        logerror: false
        
    }
    const [state, dispatch] = useReducer(authReducer, initialState)
    const login = async (data) =>{
       try {
         
      
        const res = await axios.post('/api/v1/auth/emplogin' , data)
    
        localStorage.setItem('x-auth',res.data.token)
        dispatch({
            type: EMPLOG_SUCCESS,
           payload: res.data.token
        })

       } catch (error) {
           console.log(error)
        dispatch({
            type: EMPLOG_Fail
          
        })
           
       }

        
    }

  

    return(
        <authContext.Provider value={
            {
                user: state.user,
                role: state.role,
                authenticated: state.authenticated,
                logerror: state.logerror,
                login
              
            }
        }>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;