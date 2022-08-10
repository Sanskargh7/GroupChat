
const token=localStorage.getItem('token')
const grouplist=document.querySelector('#items')
document.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault()
    axios.get('http://localhost:3200/getgroups',{
        headers:{"Authorization":token}
    }).then(ress=>{
        console.log(ress.data)
        //let data=ress.data
        let groups=ress.data.groups
        for(let i=0;i<groups.length;i++){
            let li=document.createElement('li')
            li.className='list-group-item'
            li.innerHTML=li.innerHTML+`
            <a  href="./home.html?grpId=${groups[i].id} ">
            ${groups[i].groupname}
            
           <p id="created">Created : ${groups[i].createdAt.slice(0,10)}</p>
           </a> `
           
            grouplist.appendChild(li)
        }
        
    })
})
let logoutBtn=document.querySelector('#logout')
logoutBtn.addEventListener('click',(e)=>{
    localStorage.clear()
    window.location.replace('./login.html')
})
const createGrpBtn=document.getElementById('submit-btn')
createGrpBtn.addEventListener('click',()=>{
    const grpName=(document.getElementById('group')).value
    if(grpName==''){
        grpName.placeholder='Please enter group name'
        grpName.classList.add('empty')
    }else{
        axios.post('http://localhost:3200/creategroup',{
            groupname:grpName
        },{
            headers:{"Authorization":token}
        }).then(ress=>{
            console.log(ress)
        })
    }
})
    

    
