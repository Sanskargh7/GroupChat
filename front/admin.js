const token=localStorage.getItem('token')

const addBtn=document.querySelector('#add-btn')
const removeBtn=document.querySelector('#remove-btn')
const adminBtn=document.querySelector('#admin-btn')
const removeAdminBtn=document.querySelector('#remove-admin-btn')

const addEmail=document.querySelector('#add')
const removeEmail=document.querySelector('#remove')
const adminEmail=document.querySelector('#add-admin')
const removeAdminEmail=document.querySelector('#remove-admin')
window.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault()
    const url=window.location.href
    const grpId=url.split('grpId='[1])
})
const url=window.location.href
const grpId=url.split('grpId=')[1]
addBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    if(addEmail.value==''){
        addEmail.placeholder='Please enter email'
        addEmail.classList.add('empty')
    }else{
        axios.post('http://localhost:3200/addMember',{grpId:grpId,email:addEmail.value},{headers:{"Authorization":token}})
        .then(res=>{
            showPopupMessage('Member added successfully')
        }).catch(err=>{
            showPopupMessage(err.response.data.msg)
        })
    }
})
removeBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    if(removeEmail.value==''){
        removeEmail.placeholder='Please enter email'
        removeEmail.classList.add('empty')
    }else{
        axios.post('http://localhost:3200/removeMember',{grpId:grpId,email:removeEmail.value},{headers:{"Authorization":token}})
        .then(ress=>{
            console.log(ress.data)
            if(ress.data.removeMember){
                showPopupMessage('Member removed successfully')
            }else{
                showPopupMessage('Member not present in the group')
            }
        }).catch(err=>{
            showPopupMessage(err.response.data.msg)
        })
    }
})
adminBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    if(adminEmail.value==''){
        adminEmail.placeholder='Please enter email'
        adminEmail.classList.add('empty')
    }else{
        axios.post('http://localhost:3200/makeAdmin',{grpId:grpId,email:adminEmail.value},{headers:{"Authorization":token}})
        .then(ress=>{
            console.log(ress.data)
            if(ress.data.adminMember[0]){
                showPopupMessage('Member is admin now')
            }else{
                showPopupMessage('Member not present in group add member first')
            }
        }).catch(err=>{
            showPopupMessage(err.response.data.msg)
        })
    }
})
removeAdminBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    if(removeAdminEmail.value===''){
        removeAdminEmail.placeholder='Please enter the email'
        removeAdminEmail.classList.add('empty')
    }else{
        axios.post('http://localhost:3200/removeAdmin',{grpId:grpId,email:removeAdminEmail.value},{headers:{"Authorization":token}})
        .then(ress=>{
            if(ress.data.adminMember[0]){
                showPopupMessage('member is removed from admin position')
            }else{
                showPopupMessage('Member not present in group add member first')
            }
        }).catch(err=>{
            showPopupMessage(err.response.data.msg)
        })
    }
})
let logoutBtn=document.querySelector('#logout')
logoutBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    localStorage.clear()
    window.location.replace('./login.html')
})
function showPopupMessage(msg){
    const popContainer=document.querySelector('.popup-container')
    const popMessage=document.querySelector('.popup-message')
    popMessage.innerHTML=`<p>${msg}</p>`
    popContainer.classList.add('active')
    setTimeout(()=>{
        popContainer.classList.remove('active')
    },2000)
}