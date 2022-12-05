// inspired from https://www.pinterest.com/pin/90001692545108823/

// const Todo = {
//   active: [{ title: 'Write CSS Code ', date: '19/01/2022', time: '12:04' },
//   { title: 'Learn Code ', date: '19/01/2022', time: '12:04' },],
//   done: [
//     { title: 'Learn TypeScript ', date: '19/01/2022', time: '12:04' },
//     { title: 'Practise JQuery ', date: '19/01/2022', time: '12:04' },
//     { title: 'Read documentation of Bootstrap ', date: '19/01/2022', time: '12:04' },
//   ],
//   currentTab: 1,
// }

let Todo;
document.querySelector('.todo-body-tabs')!.addEventListener('click', changeTab)

if (localStorage.getItem('Todo') == null) {
   Todo = JSON.parse(localStorage.getItem('Todo')!)
   loadItems();
   loadTab();
}


function loadItems() {
   let tab;
   tab = Todo.currentTab === 0 ? Todo.active : Todo.done;
   const todoBodyItems = document.querySelector('.todo-body-items') as HTMLDivElement;
   todoBodyItems.innerHTML = "";
   tab.forEach(t => {
      let div = document.createElement('div')
      let img = document.createElement('img')
      let h2 = document.createElement('h2')

      img.src = "./img/square-empty.svg"
      img.classList.add('item-icon')
      h2.innerText = t.title;

      div.append(img, h2)
      todoBodyItems.append(div)
   })
}

function loadTab() {
   document.querySelectorAll('.todo-body-tabs div').forEach(d => {
      if (d.dataset.id == Todo.currentTab) {
         d.classList.add('active')
      }
   })
}


function changeTab(e) {
   let tabId;
   if (e.target.dataset.id != undefined) {
      tabId = parseInt(e.target.dataset.id)
   } else {
      tabId = parseInt(e.target.parentElement.dataset.id)
   }
   console.log(tabId)
   if (tabId != Todo.currentTab) {
      Todo.currentTab = tabId
      document.querySelectorAll('.todo-head-tabs').forEach(d => {

         if (Todo.currentTab == d.dataset.id) {
            d.classList.add('active')
         } else {
            d.classList.remove('active')
         }
      })
      loadItems()
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