const form = document.querySelector('.contact_container');
let nameInput = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');
let attachment = document.getElementById('attachment');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value,
        attachment: attachment.value
    }


    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.onload = function () {
        console.log(xhr.responseText);

        if(xhr.responseText === 'success'){
            alert('Email sent successfully')
            nameInput.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';
            attachment.value = '';
        }else{
            alert("Email was sent successfully!")
        }
    }

    xhr.send(JSON.stringify(formData));
})