
const quizForm = document.querySelector('.quiz-form');

let email = document.getElementById('email');
let answer = document.getElementById('answer');
quizForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let formData = {
        email : email.value,
        answer : answer.value
    }

    if(formData.answer === 'HARWELL DEKATRON'){
        let xhr = new XMLHttpRequest();
    xhr.open('POST','/');
    xhr.setRequestHeader('content-type','application/json');
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert(`Congratulations !! that's the right answer. check ${email.value} for the next step`);
            email.value = '';
            answer.value = '';
        }else{
            alert("Email can't be sent")
        }
    }
    xhr.send(JSON.stringify(formData));    
    }else{
        alert("oops!! that's the wrong answer try again");
            email.value = '';
            answer.value = '';
    }

    
    // console.log(formData);
})