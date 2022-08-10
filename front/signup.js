document.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault()
    const signup=document.getElementById('signup')
    signup.addEventListener('click',(e)=>{
        e.preventDefault()
        const name=document.getElementById('name').value
        const email=document.getElementById('email').value
        const phoneNumber=document.getElementById('phoneNumber').value
        const password=document.getElementById('password').value
        let userDetails={
            name:name,
            email:email,
            phoneNumber:phoneNumber,
            password:password
        }
        axios.post('http://localhost:3200/user/signup',userDetails).then(result=>{
            if(result.status===200){
                alert('Successful signed up')
                //window.location.replace="login.html"
                
            }else{
                throw new Error('Failed to login')
            }
            console.log(result)
            alert(result)
            window.location.replace="./login.html"
        })
    })
})