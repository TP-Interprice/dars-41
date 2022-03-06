let tBody = document.querySelector("tbody")
let modal = document.getElementById("myModal")
let editListBtn = document.querySelector(".editList")
// let databases = [
//    {name: "Temurbek", age: "24", group: "1"},
//    {name: "Temurbek", age: "23", group: "2"},
//    {name: "Temurbek", age: "22", group: "3"},
//    {name: "Temurbek", age: "21", group: "4"}
//]
// window.localStorage.setItem('database', JSON.stringify(databases)) 

let database = window.localStorage.getItem('database')
database = JSON.parse(database)

function renderer (Array) {
    tBody.innerHTML = null
    for (let i in Array){
        let tr = document.createElement("tr")
        let tdIndex = document.createElement("td")
        let tdName = document.createElement("td")
        let tdAge = document.createElement("td")
        let tdGroup = document.createElement("td")
        let tdBtn = document.createElement("td")
        let tdButton = document.createElement("td")
        let editBtn = document.createElement("button")
        let Btn = document.createElement("button")
        tdButton.classList.add("btn")
        editBtn.classList.add("dalete")
        tdBtn.classList.add("btn")
        Btn.classList.add("dalete")
    
        tdIndex.textContent = i - 0 + 1
        tdName.textContent = Array[i].name
        tdAge.textContent = Array[i].age
        tdGroup.textContent = Array[i].group
        editBtn.textContent = "Edit"
        Btn.textContent = "X"
    
        tdButton.appendChild(editBtn)
        tdBtn.appendChild(Btn)
        tr.appendChild(tdIndex)
        tr.appendChild(tdName)
        tr.appendChild(tdAge)
        tr.appendChild(tdGroup)
        tr.appendChild(tdButton)
        tr.appendChild(tdBtn)
        tBody.appendChild(tr)

        editBtn.addEventListener("click", () => {
            selectindex = i
            modal.style.display = "block"
            document.getElementById("editName").value = Array[i].name
            document.getElementById("editAge").value = Array[i].age
            document.getElementById("editGroup").value = Array[i].group
        })

        editListBtn.addEventListener("click", () => {
            Array[selectindex].name = document.getElementById("editName").value
            Array[selectindex].age= document.getElementById("editAge").value
            Array[selectindex].group= document.getElementById("editGroup").value
            renderer(database)
            window.localStorage.setItem('database', JSON.stringify(database))
            modal.style.display = "none"
        })
        
        Btn.addEventListener("click", () => {
            tr.remove()
            Array.splice(i,1)
            renderer(database)
            window.localStorage.setItem('database', JSON.stringify(database))
        })
    }
}

renderer(database)

addPerson.addEventListener("submit", (event) => {
    event.preventDefault()
    let newName = addName.value
    let newAge = addAge.value
    let newGroup = addGroup.value
    let addDatabase = {
        name: newName,
        age: newAge,
        group: newGroup
    } 
    let database = window.localStorage.getItem('database')
    database = JSON.parse(database)
    database.push(addDatabase)
    renderer(database)
    window.localStorage.setItem('database', JSON.stringify(database))
    addName.value = null
    addAge.value = null
    addGroup.value = null
})

let modalBtn = document.querySelector(".openModal")
let closeModal = document.querySelector(".close")


closeModal.addEventListener("click", () => {
    modal.style.display = "none"
})

window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  })
