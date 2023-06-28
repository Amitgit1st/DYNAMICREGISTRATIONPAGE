function saveToLocalStorage(event)
{
    event.preventDefault();
    
    const Name=event.target.fname.value;
    const lastName=event.target.lname.value;
    const Email=event.target.email.value;

   let myObj={
    Name,
    lastName,
    Email
   };
   
   ///localStorage.setItem(myObj.Name,JSON.stringify(myObj));


   //SAVING THE DATA TO CLOUD(CRUD-CRUD)
   axios.post("https://crudcrud.com/api/d0898e0789d3470db78b8c2c82bf43e1/studentData",myObj)
   .then((response)=>{
    console.log(response)
   })
   .catch((err)=>{
    console.log(err)
   })
  //showUserOnScreen(myObj);
}

   //GETTING DATA FROM CLOUD(CRUD-CRUD)
   window.addEventListener("DOMContentLoaded",()=>{
   axios.get("https://crudcrud.com/api/d0898e0789d3470db78b8c2c82bf43e1/studentData")
   .then((response)=>{
    console.log(response)

    for (var i=0;i<response.data.length;i++)
    {
        showUserOnScreen(response.data[i]);
    }
   })
   .catch((err)=>
   {
    console.log(err)
   })
   
   
})

function showUserOnScreen(myObj)
{
    const parentElement=document.getElementById('listOfItems')
    const childElement=document.createElement('li')
    childElement.textContent=myObj.Name + " " + myObj.lastName + "-" +myObj.Email;


    //Add DELETE button
    const deleteBtn =document.createElement('input')
    deleteBtn.setAttribute("type", "button");     // or deleteBtn.type="button"
    deleteBtn.value='DELETE';

    deleteBtn.onclick=()=>{
        localStorage.removeItem(myObj.Name);
        parentElement.removeChild(childElement);
    }
    childElement.appendChild(deleteBtn) ;

    //Add edit button
    const editBtn =document.createElement('input')
    editBtn.setAttribute("type", "button");     // or editBtn.type="button"
    editBtn.value='EDIT';

    editBtn.onclick=()=>{
        localStorage.removeItem(myObj.Name);
        parentElement.removeChild(childElement);

        document.getElementById('fname').value =myObj.Name;
        document.getElementById('lname').value =myObj.lastName;
        document.getElementById('email').value =myObj.Email;
    }
    childElement.appendChild(editBtn) ;
    parentElement.appendChild(childElement);

}
