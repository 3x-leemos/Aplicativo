function initFinance(){
const el = qs('#finance-section')


el.innerHTML = `
<select id="tx-type">
<option value="income">Receita</option>
<option value="expense">Despesa</option>
</select>
<input id="tx-desc" placeholder="Descrição">
<input id="tx-value" type="number" placeholder="Valor">
<input id="tx-date" type="date">
<button class="btn" id="add-tx">Adicionar</button>
<ul id="tx-list"></ul>
`


qs('#add-tx').onclick=()=>{
const t={ id:'x'+Date.now(), type:qs('#tx-type').value, desc:qs('#tx-desc').value, value:Number(qs('#tx-value').value), date:qs('#tx-date').value }
state.tx.push(t)
save()
renderTxList()
}


renderTxList()
}


function renderTxList(){
const list=qs('#tx-list'); list.innerHTML=''
state.tx.forEach(tx=>{
const li=document.createElement('li')
li.innerHTML=`<span>${tx.desc} (${tx.date})</span><strong>${tx.type==='income'? '+':'-'} R$ ${tx.value}</strong>`
list.appendChild(li)
})
}