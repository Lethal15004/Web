const log=console.log;
const logt=console.table;
const tm=``
function Validator(idForm,parentCheck,formMessage,passWord){
    let checkInputElement={};
    //Quy tắc tạo rule:
        // -Khi có lỗi thì trả ra message lỗi
        // -Nếu không có lỗi thì trả về undefined
    let ValidatorRules={
        required:function(valueInputElement,message='Vui lòng nhập trường này'){
                    return valueInputElement ? undefined : message;
                },
    
        email:function(valueInputElement,message='Vui lòng nhập email hợp lệ'){
                    let regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    return regex.test(valueInputElement) ? undefined : message;
                },
        min:function(min){
            return function(valueInputElement,message=`Vui lòng nhập tối đa ${min} kí tự`){
                return valueInputElement.length>=min? undefined : message;
            }    
        },
        confirmpassword:function(valueInputElement,message='Vui lòng nhập đúng mật khẩu'){
            return valueInputElement===getPassword(passWord)? undefined : message;
        }
    };

    //Hàm lấy nội dung password để kiểm tra
    function getPassword(passWord){
        return formElement.querySelector(passWord).value;
    }
    
    //Hàm lấy phần tử cha ngoài cùng
    function getParent(element){
        while(element.parentElement){
            if(element.parentElement.matches(parentCheck))
                return element.parentElement;
            element = element.parentElement;
        }
    }
   

    //Lấy ra formElement 
    let formElement=document.querySelector(idForm);

    //Nếu có formElement thì xử lý trong 
    if(formElement){

        //Lấy ra tất cả element có attribute name và rules
        let inputElements=formElement.querySelectorAll('[name][rules]');
        
        let formRules=[...inputElements].reduce((accu,inputElement)=>{
            accu[inputElement.name]=inputElement.getAttribute('rules');
            return accu;
        },{})
        log(formRules)

        //Lắng nghe sự kiện blur trên từng element input
            //-> Solution tự làm riêng nhưng không tối ưu
        // inputElements.forEach((inputElement)=>{
        //     inputElement.onblur=(e)=>{
        //         let rules=formRules[e.target.name].split('|');
        //         for(let i=0;i<rules.length;++i){
        //             if(rules[i].includes(':')){
        //                 var ruleLength=rules[i].split(':');
        //                 var check=(ValidatorRules[ruleLength[0]](inputElement.value,parseInt(ruleLength[1])))
        //             }
        //             else{
        //                 var check=ValidatorRules[rules[i]](inputElement.value);
        //             }
        //             let formGroup=getParent(inputElement);
        //             let errorElement=formGroup.querySelector(formMessage);
        //             if(check){
        //                 formGroup.classList.add('invalid');
        //                 errorElement.innerText=check;
        //                 break;
        //             }
        //             else{
        //                 formGroup.classList.remove('invalid');
        //                 errorElement.innerText='';
        //             }
        //         }   
        //     }
        // })

        // Solution của anh Sơn
            
            inputElements.forEach((inputElement)=>{
                if(typeof checkInputElement[inputElement.name]==='undefined'){
                    checkInputElement[inputElement.name]=1;
                }
                else{
                    checkInputElement[inputElement.name]++;
                }
                //Thêm các rule của inputElement vào formRules
                if(checkInputElement[inputElement.name]<=1){
                    formRules[inputElement.name].split('|').forEach((rule)=>{
                        if(rule.includes(':')){
                            let ruleLength=rule.split(':');
                            var addFunction=ValidatorRules[ruleLength[0]](parseInt(ruleLength[1]));
                        }
                        else{
                            var addFunction=ValidatorRules[rule];
                        }
                        if(Array.isArray(formRules[inputElement.name])){
                            formRules[inputElement.name].push(addFunction);
                        }
                        else{
                            formRules[inputElement.name]=[addFunction];
                        }
                    })
                }
                //Lắng nghe sự kiện blur trên từng inputElement
                inputElement.onblur=(e)=>{
                    handleValidate(e.target)
                };

                //Lắng nghe sự kiện thay đổi 
                inputElement.oninput=(e)=>{
                    let formGroup=getParent(e.target)
                    if(formGroup){
                        var errorElement=formGroup.querySelector(formMessage);
                    }
                    removeError(formGroup,errorElement)
                } 
            })
                

            //Validate các inputElement
            function handleValidate(e){
                let found=true;
                let numberCheckBox=0;
                let formGroup=getParent(e);
                let errorElement=formGroup.querySelector(formMessage);
                for(let i=0;i<formRules[e.name].length;++i){
                    switch(e.type){
                        case 'radio':
                            var check =formRules[e.name][i](formElement.querySelector(`input[name=${e.name}]:checked`))
                            break;
                        case 'checkbox':
                            var check =formRules[e.name][i](formElement.querySelector(`input[name=${e.name}]:checked`))
                            break;
                        default:
                            var check = formRules[e.name][i](e.value);
                    }
                    if(check){
                        formGroup.classList.add('invalid');
                        errorElement.innerText=check;
                        found=false;
                        return found;
                     }
                }
                if(found===true){
                    removeError(formGroup, errorElement)
                }
                return found;
            }
            //Loại bỏ các inputElement
            function removeError(formGroup,errorElement){
                formGroup.classList.remove('invalid');
                errorElement.innerText='';
            }
            //Lắng nghe sự kiện submit cho form
            formElement.onsubmit=(e)=>{
                log(this)
                e.preventDefault();
                var isValidate=true;
                inputElements.forEach((inputElement)=>{
                    if(!handleValidate(inputElement)){
                        isValidate=false;
                    }
                })
               
                if(isValidate){
                    let enableInputs=formElement.querySelectorAll('[name]:not([disabled])');
                    log (enableInputs)
                    let start=0;
                    let valueSubmit=[...enableInputs].reduce(function(acc,selector){ 
                        switch(selector.type){
                            case 'radio':
                                if(selector.matches(':checked'))
                                    acc[selector.name]=selector.value;
                                break;
                            case 'checkbox':
                                let check=formElement.querySelectorAll(`[name=${selector.name}]`).length;
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
                    this.onSubmit(valueSubmit)
                }
            }

    }



}