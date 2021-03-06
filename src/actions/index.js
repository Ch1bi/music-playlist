import { ADD_SONG, DELETE_SONG, SHARE_SONG, GET_ALL_SONGS, SIGNED_IN, SIGNED_OUT, GET_CURRENT_USER } from './types'
import { saveMusic, getAllMusic, signIn, getCurrentUser, deleteMusic } from '../server/db/dbHelpers';


export function addSong(name){

    return (dispatch)=>{
        saveMusic(name)
        dispatch({type:'ADD_SONG', payload:name})
    } 
}

export function deleteSong(user, index){

    let musicArr = []

    return(dispatch)=>{

        deleteMusic(user, index)

        .then((res)=>{

            res.docs.map((doc) => {

                musicArr.push(doc.data().data)
            })
            dispatch({type:DELETE_SONG, payload:musicArr})

        })

        .catch(err => console.log(err));
    }
    
   
    
}

export function getSavedMusic(user){

    console.log('getting all saved songs')
    //array for music
    let musicArr = []

    return(dispatch)=>{

        getAllMusic(user)


        .then(querySnap=> {

            querySnap.docs.map((doc)=>{

                musicArr.push(doc.data().data)
            })
            
            dispatch({type:GET_ALL_SONGS, payload:musicArr})
        
        })
            
        .catch(function(error) {
            console.log("Error getting documents:", error);
        });


    }
}

export function signUserIn(email, password){

    console.log('signing in')

    return(dispatch)=>{

        signIn(email, password)
        .then(res => {
            
            localStorage.setItem('userData', JSON.stringify(res))
             //save user info to localstorage
    
        /* Be sure to delete user info on signOut*/
            dispatch({type:SIGNED_IN,payload:res})
    
         })
        
        .catch(err => console.log('Error fetching user'))
    }
}

export function getUser(){

    console.log('getting current user')

    return(dispatch)=>{

        getCurrentUser()
        .then(res => dispatch({type:GET_CURRENT_USER, payload:res}))
    }

}
