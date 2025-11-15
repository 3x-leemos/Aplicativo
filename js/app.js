const KEY = 'sistema_rotina_financas_v2'

function renderPage(name){
if(name==='config') initConfig()
}


function initNavigation(){
qsa('aside nav button').forEach(btn=>{
btn.onclick=()=>{
qsa('aside nav button').forEach(b=>b.classList.remove('active'))
btn.classList.add('active')
renderPage(btn.dataset.page)
}
})
}


function drawReport(){
const canvas = qs('#chart-rel')
const ctx = canvas.getContext('2d')


const days = 30
let series = Array(days).fill(0)
const now = new Date()


state.tx.forEach(t=>{
const d=new Date(t.date)
const diff=(now-d)/86400000
if(diff>=0 && diff<days){ series[days-1-Math.floor(diff)] += t.type==='income'? t.value : -t.value }
})


ctx.beginPath()
series.forEach((v,i)=>{
const x = (i/(days-1))*canvas.width
const y = canvas.height - ((v+100)/200)*canvas.height
i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y)
})
ctx.strokeStyle="#5b8def"
ctx.lineWidth=2
ctx.stroke()
}


function initConfig(){
qs('#export').onclick=()=>{
const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'})
const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='dados.json'; a.click()
}


qs('#import').onchange=e=>{
const file=e.target.files[0]
const reader=new FileReader()
reader.onload=()=>{ state=JSON.parse(reader.result); save(); alert('Dados importados!') }
reader.readAsText(file)
}
}


load()
initNavigation()
renderPage('dashboard')