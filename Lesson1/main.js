//Khai bao hằng số
const log=console.log;
const logt=console.table;
const tm=``

// let buttonElement = document.querySelector('button');
// function clickHandler(e){
//     log('Viec 1')

//     log('Viec 2')

//     alert('Viec 3')
// }
// buttonElement.addEventListener('click',clickHandler);
// setTimeout(() => {
//    buttonElement.removeEventListener('click',clickHandler)
// },3000)

// function sleep(ms,value){
//     return new Promise(resolve=>{
//         setTimeout(function(){
//             resolve(value)
//         },ms)
//     })
// }
// sleep(1000,1)
//     .then(function(value){
//         log(value)
//         return sleep(1000,value+1)
//     })
//     .then(function(value){
//         log(value)
//         return new Promise(function(resolve,reject){
//             reject('Error')
//         })
//     })
//     .then(function(value){
//         log(value)
//         return sleep(1000,value+1)
//     })
//     .then(function(value){
//         log(value)
//         return sleep(1000,value+1)
//     })
//     .catch((mess)=>{
//         log(mess)
//     })

// let promise=new Promise((resolve,reject)=>{
//     // resolve('Successfully!!')
//     reject('Error!!')
// })
// let promise=Promise.reject('Error')
//      .then((mess)=>{
//         log(`Message: ${mess}`)
//      })
//     .catch((err)=>{
//         log(`Message: ${err}`)
//     })
// let promise1=new Promise((resolve, reject) =>{
//     setTimeout(() => {
//         resolve([1])
//     }, 2000);
// })
// let promise2=new Promise((resolve, reject) =>{
//     setTimeout(() => {
//         resolve("Huy Phạm")
//     }, 5000);
// })
// Promise.all([promise1, promise2])
//             .then((rs) =>{
//                 log(rs)
//             })

// let users=[
//     {
//         id:1,
//         name:'Huy Phạm',

//     },
//     {
//         id:2,
//         name:'Ngoc Hai',

//     },
//     {
//         id:3,
//         name:'Huynh Vu',

//     },
// ];
// let comments=[
//     {
//         id:1,
//         user_id:1,
//         content:'Sao lâu ra video vậy'
//     },
//     {
//         id:2,
//         user_id:2,
//         content:'Anh mới ra đấy em'
//     },

// ]
// //1. Lấy comments
// //2. Từ comments lấy ra user_id
// //3. Từ user_id lấy ra user tương ứng

// //Fake API
// function getComment(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(() => {
//             resolve(comments)
//         }, 1000)
//     })
// }

// function getUser(arrrayUserId){
//     return new Promise((resolve,reject)=>{
//         setTimeout(() => {
//             let arrrayUser=users.filter(function(user){
//                 return arrrayUserId.includes(user.id)
//             })
//             resolve(arrrayUser)
//         }, 2000)
//     })
// }





// getComment()
//             .then(function(comments){
//                 arrrayUserId=comments.reduce(function(result,comment){
//                     result.push(comment.user_id)
//                     return result
//                 },[])
//                 return arrrayUserId;
//             })
//             .then(function(arrrayUserId){
//                 return getUser(arrrayUserId)
//             })
//             .then(function(arrrayUser){
//                 return{
//                     user: arrrayUser,
//                     'Noi dung':comments
//                 }
//             })
//             .then(function(object){
//                 let ulElement=document.getElementById('comment-block')
//                 let html=''
//                 object.user.forEach(function(user){
//                     let cm= object['Noi dung'].find(function(comment){
//                         return comment.user_id===user.id
//                     })
//                     html+=`<li>${user.name}: ${cm.content}</li>`
//                     ulElement.innerHTML=html
//                 })
//             })

// function postHandler(data){
//     let ulElement=document.getElementById('comment-block')
//     let htmls=data.map(function(post){
//         return `<li>
//             <h2>${post.title}</h2>
//             <p>${post.body}</p>
//         </li>`;
//     })
//     log(htmls)
//     ulElement.innerHTML=htmls.join('\n');
// }
// const API= 'https://jsonplaceholder.typicode.com/posts';
// fetch(API)
//     .then(function(response){
//         return response.json();
//     }
//     )
//     .then(postHandler)
//     .catch(function(err){
//         log('Có lỗi')
//     })
let courseAPI='http://localhost:3000/course'
fetch(courseAPI)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        log(data[0])
    })




