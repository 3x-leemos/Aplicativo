function initTasks(){
const el = qs('#tasks-section')


el.innerHTML = `
<input id="task-title" placeholder="Título da tarefa">
<input id="task-date" type="date">
<button class="btn" id="add-task">Adicionar</button>
<ul id="task-list"></ul>
`


qs('#add-task').onclick=()=>{
const t={ id:'t'+Date.now(), title:qs('#task-title').value, date:qs('#task-date').value, done:false }
state.tasks.push(t)
save()
renderTasks()
}


renderTasks()
}


function renderTasks(){
const list=qs('#task-list'); list.innerHTML=''
state.tasks.forEach(t=>{
const li=document.createElement('li')
li.innerHTML = `
<span>${t.title} (${t.date})</span>
<button data-id="${t.id}">X</button>
`
list.appendChild(li)
})


qsa('#task-list button').forEach(btn=>btn.onclick=()=>{
state.tasks = state.tasks.filter(t=>t.id!==btn.dataset.id)
save(); renderTasks()
})
}