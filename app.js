const btnAdd = document.querySelector('.todo-head-form button')
const inpText = document.querySelector('.todo-head-form input')

btnAdd.addEventListener("click",btnAddClick )

function btnAddClick(e){

  if (inpText.value == ''){
    return false
  }

  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let imgRemove = document.createElement('img')
  let imgEdit = document.createElement('img')
  
  div.classList.add('todo-body-item')

  h2.innerText = inpText.value;
  h2.classList.add('todo-item-title')
  h2.addEventListener('click',()=>{ h2.classList('line-through')})

  imgRemove.src = "./img/btn-remove.svg"
  imgRemove.classList.add('todo-body-item-remove')
  imgRemove.addEventListener('click',()=> { div.remove() })


  div.append(h2,imgEdit,imgRemove)

  document.querySelector('.todo-body').append(div)

}