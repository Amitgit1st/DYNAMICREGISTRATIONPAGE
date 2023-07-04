function saveToLocalStorage(event)
 {
    event.preventDefault();

    const Price = event.target.price.value;
    const Product = event.target.name.value;
    
    let myObj = {
        Price,
        Product
        
    };


    //SAVING THE DATA TO CLOUD(CRUD-CRUD)
    axios.post("https://crudcrud.com/api/1eec56bfae06412e81f8a26a241aa47f/productData", myObj)
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
    axios.get("https://crudcrud.com/api/1eec56bfae06412e81f8a26a241aa47f/productData")
        .then((response) => {
            console.log(response)

            for (var i = 0; i < response.data.length; i++) 
            {
                const DATA=response.data[i]
                showUserOnScreen(DATA);
                
            }
        })
        .catch((err) => {
            console.log(err)
        })


})



function showUserOnScreen(myObj)
 {
    const parentElement = document.getElementById('listOfItems')
    const childElement = document.createElement('li')
    childElement.textContent = myObj.Price + "-" + myObj.Product +"- " ;


    //Add DELETE button
    const deleteBtn = document.createElement('input')
    deleteBtn.setAttribute("type", "button");     // or deleteBtn.type="button"
    deleteBtn.value = 'Delete Product';

    deleteBtn.onclick = () => {
        axios.delete(`https://crudcrud.com/api/1eec56bfae06412e81f8a26a241aa47f/productData/${myObj._id}`)
        parentElement.removeChild(childElement);
    }
    childElement.appendChild(deleteBtn);

    parentElement.appendChild(childElement);

}
