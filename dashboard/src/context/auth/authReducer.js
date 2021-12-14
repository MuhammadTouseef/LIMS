
import {EMP_LOGIN, EMP_REGISTER,EMPLOG_SUCCESS,EMPLOG_Fail} from '../types'

export default (state,action) =>{
    switch(action.type){
        case EMPLOG_SUCCESS:
            return{
                ...state,
                user: action.payload,
                authenticated: true,
                logerror: false
         

             }
        case EMPLOG_Fail:
            return{
                ...state,
                authenticated: false,
                logerror:true
    }
}
}