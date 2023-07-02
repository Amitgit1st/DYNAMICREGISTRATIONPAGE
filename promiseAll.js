const posts =[];

function createPosts(post) {
    return new Promise( (resolve, reject) => { 
        setTimeout( () => { 
            posts.push(post);
            const error=false;
            if(!error)
            {
                resolve(post.title);
                updateLastUserActivityTime();
            } 
            else
            {
               reject('Error');
            }
        },1000);
    });
}
            
const user={
    username:'amit',
    lastactivityTime:'13th of june'
}

function updateLastUserActivityTime(){
    return new Promise((resolve,reject)=>{
        setTimeout( ()=>{
            user.lastactivityTime =new Date();
            resolve(user.lastactivityTime)
        },1000)
    })
}

function deletePost(){
    return new Promise((resolve,reject)=>{
        let n =posts.length;
        if(n>0){
           const deletePost= posts.pop();
           resolve(deletePost);
        }
        else{
            reject("error")
        }
    });
}


function userUpdatePost(){
Promise.all([createPosts({title: 'Post Five', body: 'This is Post Five'}), updateLastUserActivityTime()])
.then(([createPost,LastUserActivityTime])=>{
    console.log("POST:",createPost)
    console.log("TIME:",LastUserActivityTime)
    return deletePost();

})
.then(deletedPost =>{
    console.log("Deleted post:", deletedPost);
    console.log("Remaining posts:", posts);
})

.catch(err=>console.log(err))
}
userUpdatePost();