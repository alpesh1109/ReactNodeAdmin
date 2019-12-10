import { USER_DATA } from './types';
import axios from 'axios';


export const getuserdata = (mail,pass, callback) => dispatch => {

    var url = 'http://localhost:3000/SignInData';
    axios.post(url,
        {         
            kanEmail: mail,
            kanPass:pass
        }
    ).then((res) => {

        var userdata = [];    
        userdata.push(res.data);    
        // for (var i = 0; i < res.data.length; i++) {
        //     userdata.push(res.data[i]);
        // }
        if (!!callback) {
            callback();
        }

        return dispatch({
            type: USER_DATA,
            payload: userdata
        });
    })
        .catch(err => {
            console.log(err);
            throw new Error('Error in SignnIn funtion');

        });

}