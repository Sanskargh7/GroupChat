// const messagebtn=document.getElementById('addmsgbtn')
// const messageinput=document.getElementById('messageinput')
// messagebtn.addEventListener('click',(e)=>{
//     e.preventDefault()
//     const token =localStorage.getItem('token')
//     let paramString=window.location.href;
//     let groupid=paramString.split('groupid=')[1]

//     let message=messageinput.value;
//     console.log(messageinput.value)
//     messageinput.value=""
//     axios.post('http://localhost:3000/addmessage',{
//         groupid:groupid,
//         message:message
//     },
//     {headers:{"Authorization":token}
//     }).then(res=>{
//         console.log(res)
//     })
// })
// document.addEventListener('DOMContentLoaded',async()=>{
//     // setInterval(()=>{
//         //getMessages()
//     //    },10000)
//     addMembers()
// })
// function callingGetMessageApi(){
    
// }
// callingGetMessageApi()
// })
    
    

// function getMessages(){
//     const token=localStorage.getItem('token')
//     //axios.get('http://localhost:3000/message/getmessage',{headers:{"Authorization":token}}).then(messages=>{
//     let paramString=window.location.href
//     //console.log(paramString)
//     let groupid=paramString.split('groupid=')[1]
//     //console.log(groupid)
//     //const token=localStorage.getItem('token')
//     axios.get(`http://localhost:3000/getmessage?lastmsg=0&groupid=${groupid}`,{
//         headers:{"Authorization":token}
//     }).then(messages=>{
//         let message_cont_ul=document.getElementById('message_cont_ul')
//         if(messages.data==='user not allowed'){
//             const add_message=document.getElementById('add_message')
//             add_message.classList.remove('add_message')
//             add_message.classList.add('add_message_none')
//             message_cont_ul.innerHTML="<h1>User not allowed in this group</h1>"
//         }else{
//             const msgcontainer=document.getElementById('msgs')
//             console.log(messages)
//             for(let i=0;i<messages.data.length;i++){
//             const msgdiv=document.createElement('div')
//             msgdiv.classList.add('msgdiv')
//             const name=document.createElement('div')
//             name.innerHTML= `<p>${messages.data[i].username}:</p>`
//             msgdiv.appendChild(name)
//             const msg=document.createElement('span')
//             msg.innerHTML=`<p>${messages.data[i].msg}</p>`
//             msgdiv.appendChild(msg)
//             msgcontainer.appendChild(msgdiv)
//             }
//         }
//     })
// }
// document.addEventListener('DOMContentLoaded',async()=>{
//     setInterval(()=>{
//         getMessages()
//     },1000)
// })
//function getMessages(){
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
//}
//const token=localStorage.getItem('token')
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
// function addMembers(){
//     const addMembersinput=document.getElementById('addMembersinput')
//     const addMembersBtn=document.getElementById('addMembersBtn')
//     addMembersBtn.addEventListener('click',(e)=>{
//         let paramString=window.location.href
//         let grpId=paramString.split('grpId=')[1]
//         const token=localStorage.getItem('token')
//         axios.post('http://localhost:3000/addUsertogroup',{
//             groupid:grpId,
//             user:addMembersinput.value
//         },{
//             headers:{"Authorization":token}
//         }).then(ress=>{
//             console.log(ress)
//             if(ress.data.length>2){
//                 alert(ress.data)
//             }else{
//                 alert('user not found')
//             }
//             addMembersinput.value=''
//         }).catch(err=>{
//             console.log(err)
//         })
//     })
// }
    
   
    


