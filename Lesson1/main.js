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
// const coursesAPI = 'http://localhost:3000/course';
// let buttonCreate=document.querySelector("div:nth-child(2) div:nth-child(3) button:nth-child(1)")
// let buttonSave=document.querySelector("div:nth-child(2) div:nth-child(3) button:nth-child(2)")
// let listCoursesBlock=document.getElementById('list-courses')

// // Start to render course
// function start(){
//     getCourses(function(listCourses){
//         renderCourses(listCourses)
//     })
//     handleFormCreate();
// }
// start()

// function getCourses(callback){
//     fetch(coursesAPI)
//         .then(function(response){
//             return response.json()
//         })
//         .then(callback)
// }
// function renderCourses(listCourses){
//     let html=listCourses.map(function(course){
//         return `<li class="item-course-${course.id}">
//             <h3>${course.name}</h3>
//             <p>${course.description}</p>
//             <button onclick="handleDeleteCourse(${course.id})">Delete</button>
//             <button onclick="handleChangeCourse(${course.id})">Change</button>
//         </li>`
//     })
//     listCoursesBlock.innerHTML=html.join('')
// }


// //Create Course
// function createCourse(data,callback){
//     let options={
//         method: 'POST',
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         },
//         body:JSON.stringify(data)
//     }
//     fetch(coursesAPI,options)
//         .then(function(response){
//             return response.json();
//         })
//         .then(callback)
// }
// function handleFormCreate(){
//     buttonCreate.addEventListener("click",function(e){
//         let name=document.querySelector("input[name='name']").value;
//         let description=document.querySelector("input[name='description']").value;
//         let formData={
//             name:name,
//             description:description
//         }
//         document.querySelector("input[name='name']").value='';
//         document.querySelector("input[name='description']").value='';
//         createCourse(formData,function(course){
//             let html=`<li class="item-course-${course.id}">
//                         <h3>${course.name}</h3>
//                         <p>${course.description}</p>
//                         <button onclick="handleDeleteCourse(${course.id})">Delete</button>
//                         <button onclick="handleChangeCourse(${course.id})">Change</button>
//                      </li>`
//             listCoursesBlock.innerHTML+=html
//         })
//     })
// }


// //Delete Course
// function handleDeleteCourse(id){
//     let options={
//         method:'DELETE',
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         }
//     }
//     fetch(coursesAPI+'/'+id, options)
//         .then(function(response){
//             return response.json();
//         })
//         .then(function(){
//             let elementRemove=document.querySelector(`.item-course-${id}`)
//             elementRemove.remove();
//         })
// }

// //Change Course
// function handleChangeCourse(id){
//     getNewContent(id,handle);

//     function handle(formData){
//         let options={
//             method: 'PUT',
//             headers: {
//                 "Content-type": "application/json; charset=UTF-8"
//             },
//             body:JSON.stringify(formData)
//         }
//         fetch(coursesAPI+'/'+id,options)
//             .then(function(response){
//                 return response.json();
//             })
//             .then(function(data){
//                 log(data);
//                 document.querySelector(`.item-course-${id} h3`).innerText=data.name;
//                 document.querySelector(`.item-course-${id} p`).innerText=data.description;
//             })
//     }

// }
// function getNewContent(id,callback){
//     document.querySelector("input[name='name']").value=document.querySelector(`.item-course-${id} h3`).innerText;
//     document.querySelector("input[name='description']").value=document.querySelector(`.item-course-${id} p`).innerText; 
//     buttonCreate.classList.toggle('hidden');
//     buttonSave.classList.toggle('hidden');
//     buttonSave.addEventListener('click', function(e){
//         let name=document.querySelector("input[name='name']").value;
//         let description=document.querySelector("input[name='description']").value;
//         document.querySelector("input[name='name']").value='';
//         document.querySelector("input[name='description']").value='';
//         buttonCreate.classList.toggle('hidden');
//         buttonSave.classList.toggle('hidden');
//         let formData={
//             name:name,
//             description:description
//         }
//         callback(formData)
//     })
// }

const app={
    getName:()=>{
        return 'Hi'
    },
    handleEvent:()=>{
        log(this.getName)
    }

}
app.handlEvents()






