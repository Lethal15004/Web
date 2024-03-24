const log=console.log;
const logt=console.table;
const tm=``


let tab_Items=document.querySelectorAll('.tab-item');
let tab_Panes=document.querySelectorAll('.tab-pane');
let i_Items=document.querySelectorAll('.tab-icon')
let line=document.querySelector('.line')
start();
function start() {
    line.style.width=document.querySelector('.tab-item.active').offsetWidth+'px';
    line.style.left=document.querySelector('.tab-item.active').offsetLeft+'px';
    tab_Items.forEach((tab_Item,index)=>{
        let pane=tab_Panes[index];
        tab_Item.addEventListener('click',(e)=>{
            if(e.target.tagName.toLowerCase()==='i'){
                e.stopPropagation();
            }
            else{
                document.querySelector('.tab-item.active').classList.remove('active');
                document.querySelector('.tab-pane.active').classList.remove('active');
                e.target.classList.add('active');
                line.style.width=e.target.offsetWidth+'px';
                line.style.left=e.target.offsetLeft+'px';
                pane.classList.add('active');
            }
        })
    })
}
