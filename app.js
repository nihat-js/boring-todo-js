// inspired from https://www.pinterest.com/pin/90001692545108823/
// const Todo = {
//     active: [
//         { id: 0, title: 'Check Clasroom', date: '19/01/2022', time: '12:04', state: 0, },
//         { id: 1, title: 'Create Todo App', date: '19/01/2022', time: '12:04', state: 0, },
//         { id: 1, title: 'Learn Quick Sort', date: '19/01/2022', time: '12:04', state: 0, },
//     ],
//     done: [
//         { id: 0, title: 'Learn TypeScript ', date: '19/01/2022', time: '12:04' },
//         { id: 1, title: 'Practise JQuery ', date: '19/01/2022', time: '12:04' },
//         { id: 2, title: 'Read documentation of Bootstrap ', date: '19/01/2022', time: '12:04' },
//     ],
//     currentTab: 'active',
// }

// localStorage.setItem('Todo', JSON.stringify(Todo))


// var Todo;
var todoBodyItems = document.querySelector('.todo-body-items');
var todoBodyTabs = document.querySelector('.todo-body-tabs');
var todoBodyItem = todoBodyItems.getElementsByTagName('div');
const todoModalAdd = document.querySelector('.todo-modal-add')
const btnAdd = document.getElementById('btn-add')
const btnAddModal = document.getElementById('btn-add-modal')

const randomIdeas = ['Buy Umbrella', 'Drop off the school', 'Play PES2013', 'Play blackjack', 'Go for a walk', 'Watch Fight Club']



todoBodyItem: Array;
todoBodyTabs.addEventListener('click', changeTab)
btnAdd.addEventListener('click', btnAddClick)
btnAddModal.addEventListener('click', btnAddModalClick)

if (localStorage.getItem('Todo') !== null) {
    Todo = JSON.parse(localStorage.getItem('Todo'));
    loadItems();
    // loadTab();
}

function loadItems() {

    todoBodyItems.innerHTML = "";
    Todo[Todo.currentTab].forEach(function (t) {
        let mainDiv = document.createElement('div');
        let firstDiv = document.createElement('div');
        let secondDiv = document.createElement('div');
        let img = document.createElement('img');
        let input = document.createElement('input');

        let btnMove = document.createElement('move');
        let btnEdit = document.createElement('button');
        let btnDelete = document.createElement('button');
        let btnSave = document.createElement('button')

        mainDiv.classList.add('item')
        mainDiv.dataset.id = t.id
        mainDiv.draggable = true;

        img.src = t.status == 0 ? "./img/not-checked.svg" : "./img/checked.svg"
        img.classList.add('item-icon');
        img.addEventListener('click', () => {
            if (t.status == 0) {
                img.src = "./img/checked.svg"
                t.status = 1
            } else {
                img.src = "./img/not-checked.svg"
                t.status = 0
            }
            updateLocalStorage()
        })

        input.value = t.title;
        input.setAttribute('readonly', 'true')
        input.classList.add('item-input')

        btnDelete.innerText = "Delete"
        btnDelete.classList.add('item-delete')

        btnEdit.innerText = 'Edit';
        btnEdit.classList.add('item-edit')

        btnMove.innerText = 'Move';
        btnMove.classList.add('item-move')

        btnSave.innerText = 'Save';
        btnSave.classList.add('item-save', 'd-none')



        btnMove.addEventListener('dragstart', () => {
            console.log('Moving');
            btnMove.addEventListener('move', () => {
            })
        })


        btnEdit.addEventListener('click', () => {
            btnEdit.classList.add('d-none')
            btnDelete.classList.add('d-none')
            btnSave.classList.remove('d-none')
            input.removeAttribute('readonly')
            input.focus();
        })

        btnSave.addEventListener('click', () => {
            btnEdit.classList.remove('d-none')
            btnDelete.classList.remove('d-none')
            btnSave.classList.add('d-none')
            input.setAttribute('readonly', 'true')
            Todo[Todo.currentTab].find(x => x.id == mainDiv.dataset.id).title = input.value;
            updateLocalStorage()
        })

        btnDelete.addEventListener('click', () => {
            mainDiv.remove()
            Todo[Todo.currentTab].splice(Todo[Todo.currentTab].findIndex(x => x.id == mainDiv.dataset.id), 1)
            updateLocalStorage()
        })

        firstDiv.append(img, input)
        secondDiv.append(btnMove, btnEdit, btnDelete, btnSave)
        mainDiv.append(firstDiv, secondDiv);
        todoBodyItems.append(mainDiv);
    });
}


function updateLocalStorage() {
    localStorage.setItem('Todo', JSON.stringify(Todo))
}


// function loadTab() {
//    const tabs = document.querySelectorAll('.todo-head-tabs div') as NodeListOf<HTMLDivElement>;
//    tabs.forEach(d => {
//       let id = d.dataset.id;
//       if (id ==  Todo.currentTab) {
//          d.classList.add('active')
//       }
//    })
// }
function changeTab(e) {
    var tabId;
    if (e.target.dataset.id != undefined) {
        tabId = parseInt(e.target.dataset.id);
    }
    else {
        tabId = parseInt(e.target.parentElement.dataset.id);
    }
    console.log(tabId);
    if (tabId != Todo.currentTab) {
        Todo.currentTab = tabId;
        document.querySelectorAll('.todo-head-tabs').forEach(function (d) {
            if (Todo.currentTab == d.dataset.id) {
                d.classList.add('active');
            }
            else {
                d.classList.remove('active');
            }
        });
        loadItems();
    }
}
// function btnAddClick(e) {
//   if (inpText.value == '') {
//     return false
//   }
//   let div = document.createElement('div')
//   let h2 = document.createElement('h2')
//   let imgRemove = document.createElement('img')
//   let imgEdit = document.createElement('img')
//   div.classList.add('todo-body-item')
//   h2.innerText = inpText.value;
//   h2.classList.add('todo-item-title')
//   h2.addEventListener('click', () => { h2.classList('line-through') })
//   imgRemove.src = "./img/btn-remove.svg"
//   imgRemove.classList.add('todo-body-item-remove')
//   imgRemove.addEventListener('click', () => { div.remove() })
//   div.append(h2, imgEdit, imgRemove)
//   document.querySelector('.todo-body').append(div)
// }

document.body.addEventListener('click', bodyClick)


function bodyClick(e) {
    if (!todoModalAdd.classList.contains('d-none') && e.target.classList == 'todo-modal-add') {
        todoModalAdd.classList.add('d-none')
    }
}


function btnAddClick() {
    todoModalAdd.classList.remove('d-none')
    todoModalAdd.querySelector('input').placeholder = randomIdeas[Math.floor(randomIdeas.length * Math.random())]

}

function btnAddModalClick() {
    let input = todoModalAdd.querySelector('input')
    let lastId = Todo[Todo.currentTab].length
    Todo[Todo.currentTab].push({
        id: lastId + 1,
        title: input.value,
        date: Date('d-m-y'),
        time: Date('h-m-s'),
        state: 0,
    })
    loadItems();
    updateLocalStorage()
    todoModalAdd.classList.add('d-none')
}