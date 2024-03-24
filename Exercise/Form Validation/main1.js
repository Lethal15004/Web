const log=console.log;
const logt=console.table;
const tm=``

const API='http://localhost:3000/account';
//Đối tượng Validator
function Validator({form,errorMessage,formGroup,rules,onSubmit}){
    //Các hàm

    //Hàm để lấy phàn tử cha
    function getParent(element,selector){
        log(selector)
        while(element.parentElement){
            if(element.parentElement.matches(selector))
                return element.parentElement;
            element = element.parentElement;
        }
    }
    //Hàm thực hiện validate
    function validate(rulesSelector,inputElement,rule){
        let found=true;
        //Lấy nhiều rule cho 1 input
        let rules=rulesSelector[rule.selector]
        let errorElement= getParent(inputElement,formGroup).querySelector(`.${errorMessage}`)
        var check;
        //Duyệt qua từng rule của input element
        for(let i=0;i<rules.length;++i){
                switch(inputElement.type){
                    case 'radio':
                        log(rule.selector)
                        check=rules[i](formSelect.querySelector(rule.selector+':checked'));
                        break;
                    case 'checkbox':
                        check=rules[i](formSelect.querySelector(rule.selector+':checked'));
                        break;
                    default:
                        check=rules[i](inputElement.value)
                }
                if(check){
                    errorElement.innerText=check
                    getParent(inputElement,formGroup).classList.add('invalid')
                    found=false;
                    break;
                }
        }
        if(found===true)
            removeError(inputElement,errorElement)
        return found;
    }

    //Hàm xóa bỏ lỗi
    function removeError(inputElement,errorElement){
        errorElement.innerText=``
        getParent(inputElement,formGroup).classList.remove('invalid')
    }








    //Xây dựng một object chứa các rule của input
    let rulesSelector=rules.reduce((acc, rule) =>{
        if(Array.isArray(acc[rule.selector]))
            acc[rule.selector].push(rule.test)
        else
            acc[rule.selector]=[rule.test]
        return acc
    },{})


    //Sự kiện submit form
    let formSelect=document.querySelector(`${form}`); 
    formSelect.onsubmit=(e)=>{
        let isValid=true; 
        e.preventDefault(); 
        rules.forEach((rule)=>{
            //Lấy element của input
            let inputElement= formSelect.querySelector(rule.selector);
            validate(rulesSelector,inputElement,rule)  
            if(!validate(rulesSelector,inputElement,rule))
                isValid=false
        })
        if(isValid){
            if(typeof onSubmit==='function')
            {
                let enableInputs=formSelect.querySelectorAll('[name]:not([disabled])');
                log (enableInputs)
                let start=0;
                let valueSubmit=[...enableInputs].reduce(function(acc,selector){ 
                    switch(selector.type){
                        case 'radio':
                            if(selector.matches(':checked'))
                                acc[selector.name]=selector.value;
                            break;
                        case 'checkbox':
                            let check=formSelect.querySelectorAll(`[name=${selector.name}]`).length;
                            if(!selector.matches(':checked'))
                                ++start;
                            else{
                                if(Array.isArray(acc[selector.name]))
                                    acc[selector.name].push(selector.value)
                                else
                                    acc[selector.name]=[selector.value]
                            }
                            if(start===check)
                                acc[selector.name]=[];
                            break;
                        case 'file':
                            acc[selector.name]=selector.files
                            break
                        default:
                            (acc[selector.name]=selector.value)
                    }
                    return acc
                },{})
                log(valueSubmit)
                setnewData(onSubmit(valueSubmit))
            }
        }
    }
   
    //Sự kiện blur và input và change
    if(formSelect){
        rules.forEach((rule)=>{
            //Lấy element của input
            let inputElements= formSelect.querySelectorAll(rule.selector);
            [...inputElements].forEach((inputElement)=>{
                if(inputElement){
                    inputElement.onblur=(e)=>{
                        validate(rulesSelector,inputElement,rule)
                    }
                    inputElement.oninput=(e)=>{
                        removeError(inputElement,getParent(inputElement,formGroup).querySelector(`.${errorMessage}`))
                    }
                    if(inputElement.name==='province'){
                        inputElement.onchange=(e)=>{
                            validate(rulesSelector,inputElement,rule);
                        }
                    }
                    
                }
            })

        })
    }
}

// Luật cần nội dung 
Validator.isRequired = (selector,message)=>{
    return{
        selector,
        test(content){
            return content.trim() ? undefined: message|| 'Vui lòng nhập trường này'
        }
    }
}

// Luật kiểm tra email
Validator.isEmail = (selector,message)=>{
     return{
        selector,
        test(content){
            let regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(content)? undefined: message|| 'Vui lòng nhập trường này'
        }
    }
}

//Luật độ dài tối thiểu
Validator.isMinLength = (selector,min,message)=>{
    return{
        selector,
        test(content){
            return content.length>=min ? undefined: message||`Vui lòng ${min} kí tự trở lên`
        }
    }
}

//Luật xác nhận mật khẩu
Validator.isPassword=(selector,getConfirmValue,message)=>{
    return{
        selector,
        test(content){
          return content===getConfirmValue().value?undefined:message|| 'Vui lòng nhập trường này'
        }
    }
}

Validator.isRadioCheckBox = (selector,message)=>{
    return{
        selector,
        test(content){
            return content ? undefined: message|| 'Vui lòng nhập trường này'
        }
    }
}

function setnewData(data){
    let option={
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body:JSON.stringify(data)
    }
    fetch(API,option)
        .then((response)=>{
             return response.json();
        })
        .then((data)=>{
            log(data);
        })
        .catch((err)=>{
            log(err);
        })
}
