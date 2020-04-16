function testNewPwd(){
    let pwd = document.querySelector('#register-pwd').value;

    if(pwd.length < 6 || pwd.length > 12){
        document.querySelector('#new-pwd-error').innerHTML = "Informe uma senha válida";
        return false;
    }
    else{
        document.querySelector('#new-pwd-error').innerHTML = "";
        return true;
    }
}

function confirmPwd(){
    let confirmNewPwd = document.querySelector('#confirm-pwd').value;
    let pwd = document.querySelector('#register-pwd').value;

    
    if(pwd != confirmNewPwd){
        document.querySelector('#confirm-pwd-error').innerHTML = "As senhas informadas não são iguais";
        return false;
    }
    else{
        document.querySelector('#confirm-pwd-error').innerHTML = "";
        return true;
    }
}

function testDate(){
    let data = new Date(document.querySelector('#data-nascimento').value);
    let ano = data.getFullYear().valueOf();
    
    if(ano<1900 || ano>2020) {
        document.querySelector('#data-nascimento-error').innerHTML = "Informe uma data válida";
        return false;
    }
    else{
        document.querySelector('#data-nascimento-error').innerHTML = "";
        return true;
    }
    
}

function testPhone(){
    let phone = document.querySelector('#cel-number').value;
    console.log(phone);
}

document.querySelector('.formulario').addEventListener('submit', function(event){
    event.preventDefault();
    
    test1 = testNewPwd();
    test2 = confirmPwd();
    test3 = testDate();
    
    if(test1 && test2 && test3){
        document.querySelector('.formulario').reset();        
        campos[0].focus();
    }
    
});
