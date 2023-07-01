function saveToLocalStorage(event) {
    event.preventDefault();

    const Name = event.target.fname.value;
    const lastName = event.target.lname.value;
    const Email = event.target.email.value;

    let myObj = {
        Name,
        lastName,
        Email
    };


    //SAVING THE DATA TO CLOUD(CRUD-CRUD)
    axios.post("https://crudcrud.com/api/a4587b502c294cd49f14ddde0939278f/studentData", myObj)
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })
    showUserOnScreen(myObj);
}


//GETTING DATA FROM CLOUD(CRUD-CRUD)
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/a4587b502c294cd49f14ddde0939278f/studentData")
        .then((response) => {
            console.log(response)

            for (var i = 0; i < response.data.length; i++) {
                showUserOnScreen(response.data[i]);
            }
        })
        .catch((err) => {
            console.log(err)
        })


})

function showUserOnScreen(myObj) {
    const parentElement = document.getElementById('listOfItems')
    const childElement = document.createElement('li')
    childElement.textContent = myObj.Name + " " + myObj.lastName + "-" + myObj.Email;


    //Add DELETE button
    const deleteBtn = document.createElement('input')
    deleteBtn.setAttribute("type", "button");     // or deleteBtn.type="button"
    deleteBtn.value = 'DELETE';

    deleteBtn.onclick = () => {
        axios.delete(`https://crudcrud.com/api/a4587b502c294cd49f14ddde0939278f/studentData/${myObj._id}`)
        parentElement.removeChild(childElement);
    }
    childElement.appendChild(deleteBtn);

    parentElement.appendChild(childElement);

}
