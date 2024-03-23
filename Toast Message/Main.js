const log=console.log;
const logt=console.table;
const tm=``

let container=document.querySelector('.container');
let btnSuccess=document.querySelector('.btn-success');
let btnFail=document.querySelector('.btn-danger');
const inconReplace={
    success:'"fa-solid fa-circle-check"',
    info:'"fa-solid fa-circle-info"',
    warn:'"fa-solid fa-circle-exclamation"',
    error:'"fa-solid fa-circle-xmark"'
}

function toast({title='',message='',type='info',duration=3000}){
    let toast=document.createElement('div');
    toast.classList.add('toast',`toast-${type}`);
    toast.style.animation=`slideInLeft 0.3s forwards,fadeOut linear 1s ${(duration/1000).toFixed(2)}s forwards`;
    toast.innerHTML=`
            <div class="toast_icon">
                <i class=${inconReplace[type]}></i>
            </div>
            <div class="toast_body">
                <h3 class="toast_title">${title}</h3>
                <p class="msg">${message}</p>
            </div>
            <div class="toast_close">
                <i class="fa-solid fa-xmark"></i>
            </div>
    `
    container.appendChild(toast)
    let autoRemove= setTimeout(() => {
        container.removeChild(toast);
    }, duration+1000);
    toast.onclick=(e)=>{
        if(e.target.closest('.toast_close')){
            container.removeChild(toast);
            clearTimeout(autoRemove);
        }
    }


}
btnSuccess.onclick=() => {
    toast({
        title:'Thành công',
        message:'Bạn đã đăng ký thành công tài khoản tại web',
        type:'success',
        duration:5000,
    })
}
btnFail.onclick=() => {
    toast({
        title:'Thất bại',
        message:'Có lỗi xảy ra, vui lòng liên hệ quản trị viên',
        type:'error',
        duration:5000,
    })
}

