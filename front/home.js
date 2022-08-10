
    const token=localStorage.getItem('token')
    window.addEventListener('DOMContentLoaded',(e)=>{
        const url=window.location.href
        const grpId=url.split('grpId=')[1]
        axios.get(`http://localhost:3200/isAdmin?grpId=${grpId}`,{headers:{"Authorization":token}})
        .then(user=>{
            let admin=user.data.user.isAdmin
            console.log(admin)
            if(admin){
                const adminDiv=document.querySelector('.admin')
                let li=document.createElement('li')
                li.innerHTML=li.innerHTML +`<a href="./admin.html?grpId=${grpId}"><p>Admin Controls</p></a>`
                adminDiv.appendChild(li)
            }
            axios.get(`http://localhost:3000/getmessage?grpId=${grpId}`,{headers:{"Authorization":token}})
            .then(ress=>{
                const messages=ress.data.msgs
                console.log(messages)
                for(let i=0;i<messages.length-1;i++){
                    const date=messages[i].createdAt.slice(0,10)
                    const time=messages[i].createdAt.slice(11,16)
                    displayMessage(messages[i].name,messages[i].msg,date,time)    
                }
            })
        })
    })

const sendBtn=document.querySelector('.send-btn')
sendBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    const url=window.location.href
    const grpId=url.split('grpId=')[1]
    const message=(document.querySelector('#message')).value
    if(message==''){
        message.placeholder='Please enter message'
        message.classList.add('empty')
    }else{
        axios.post('http://localhost:3000/addmessage',{groupid:grpId,msg:message},{
            headers:{"Authorization":token}
        }).then(ress=>{
            const details=ress.data.result
            console.log(details)
            const date=details.createdAt.slice(0,10)
            const time=details.createdAt.slice(11,16)
            displayMessage(details.name,details.msg,date,time)
        }).catch(err=>{
            console.log(err)
        })
    }
})
const messageContainer=document.querySelector('#message-container')
function displayMessage(name,message,date,time){
    const messageDiv=document.createElement('div')
    messageDiv.innerHTML=`
    <p><b>${name}:</b> &nbsp;&nbsp; ${message} &nbsp;&nbsp;&nbsp;
    ${date} &nbsp;&nbsp; ${time} </b></p>`
    messageContainer.append(messageDiv)
}
let logoutBtn=document.querySelector('#logout')
logoutBtn.addEventListener('click',()=>{
    localStorage.clear()
    window.location.replace('./login.html')

})

    
   
    


