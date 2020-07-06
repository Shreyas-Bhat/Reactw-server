import * as ActionTypes from './ActionTypes';

import { baseUrl } from '../shared/baseUrl';

//recieves comment and pushes to the server
export const addComment= (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment=(dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date= new Date().toISOString();
//fetch operation
    return fetch(baseUrl+ 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })

    //response
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': '+response.statusText);
            error.response=response;
            throw error;
        }
    }, 
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json()) //includes an id
    .then(response => dispatch(addComment(response))) 
    .catch(error => { console.log('Post comments', error.message); 
    alert('Your comment could not be posted\nError'+error.message);})
    //resolve of promise
   
}

    



//dishes
export const fetchDishes = () => (dispatch)=> {
     dispatch(dishesLoading(true));

     return fetch(baseUrl + 'dishes')
     .then(response => {
         if(response.ok){
             return response;
         }
         else{
             var error = new Error('Error ' + response.status + ': '+response.statusText);
             error.response=response;
             throw error;
         }
     }, 
     error => {
         var errmess = new Error(error.message);
         throw errmess;
     })
     .then(response => response.json()) //resolve of promise
     .then(dishes =>dispatch(addDishes(dishes)))
     .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading=() => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed=(errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes =(dishes) => ({
    type:ActionTypes.ADD_DISHES,
    payload: dishes

})


//comments

export const fetchComments = () => ( dispatch )=> {
    

    return fetch(baseUrl + 'comments')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': '+response.statusText);
                error.response=response;
                throw error;
            }
        }, 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response =>response.json())
    .then(comments =>dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
}
export const addComments =(comments) => ({
    type:ActionTypes.ADD_COMMENTS,
    payload: comments

})
export const commentsFailed=(errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});



//promtions
export const fetchPromos = () => ( dispatch)=> {
    dispatch(promosLoading(true));

    return fetch(baseUrl+'promotions')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': '+response.statusText);
                error.response=response;
                throw error;
            }
        }, 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response =>response.json())
    .then(promos =>dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading=() => ({
   type: ActionTypes.PROMOS_LOADING
});

export const promosFailed=(errmess) => ({
   type: ActionTypes.PROMOS_FAILED,
   payload: errmess
});

export const addPromos =(promos) => ({
   type:ActionTypes.ADD_PROMOS,
   payload: promos
})


//LEADERS


export const fetchLeaders = () => ( dispatch)=> {
    dispatch(leadersLoading(true));

    return fetch(baseUrl+'leaders')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': '+response.statusText);
                error.response=response;
                throw error;
            }
        }, 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response =>response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading=() => ({
   type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed=(errmess) => ({
   type: ActionTypes.LEADERS_FAILED,
   payload: errmess
});

export const addLeaders =(leaders) => ({
   type:ActionTypes.ADD_LEADERS,
   payload: leaders
})
//postfeedback


export const postFeedback=(
    firstname,
    lastname,
    telnum,
    email,
    agree,
    contactType,
    message
    ) => (dispatch) => {

    const newFeedback= {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    };

//fetch operation
    return fetch(baseUrl+ 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })

    //response
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': '+response.statusText);
            error.response=response;
            throw error;
        }
    }, 
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json()) //includes an id
    .then(response => alert("Thank you for your feedback" + JSON.stringify(response)))  //resolve of promise
    .catch(error => { console.log('Post feedback', error.message); 
    alert('Your feedback could not be posted\nError'+error.message);
});
   
};

    

//send to store