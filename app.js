
const KEY='recursionLMS_v1';
const TOTAL_FIELDS=34;
const state = JSON.parse(localStorage.getItem(KEY) || '{}');
state.student = state.student || {name:'', className:'', group:''};
state.answers = state.answers || {};
state.checks = state.checks || {};
state.submitted = state.submitted || false;
state.submittedAt = state.submittedAt || null;

function saveState(){ localStorage.setItem(KEY, JSON.stringify(state)); updateProgress(); }
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function answeredCount(){
  const a=Object.values(state.answers).filter(v=>String(v).trim().length>0).length;
  const c=Object.values(state.checks).filter(Boolean).length;
  return a+c;
}
function bindAutosave(){
  document.querySelectorAll('[data-key]').forEach(el=>{
    const k=el.dataset.key;
    if(el.type==='checkbox') el.checked=!!state.checks[k];
    else if(state.answers[k]!==undefined) el.value=state.answers[k];
    el.addEventListener('input',()=>{state.answers[k]=el.value;saveState()});
    el.addEventListener('change',()=>{
      if(el.type==='checkbox') state.checks[k]=el.checked;
      else state.answers[k]=el.value;
      saveState();
    });
  });
  ['studentName','studentClass','studentGroup'].forEach(id=>{
    const el=document.getElementById(id); if(!el) return;
    const map={studentName:'name',studentClass:'className',studentGroup:'group'};
    el.value=state.student[map[id]]||'';
    el.addEventListener('input',()=>{state.student[map[id]]=el.value;saveState()});
  });
  updateProgress();
}
function updateProgress(){
  const pct=Math.min(100,Math.round(answeredCount()/TOTAL_FIELDS*100));
  document.querySelectorAll('.progress>span').forEach(x=>x.style.width=pct+'%');
  document.querySelectorAll('[data-progress-text]').forEach(x=>x.textContent=pct+'%');
}
function clearAll(){
  if(confirm('Xóa toàn bộ bài làm đã lưu trên thiết bị này?')){
    localStorage.removeItem(KEY); location.reload();
  }
}
function copyPrompt(id){
  const text=document.getElementById(id)?.innerText||'';
  navigator.clipboard?.writeText(text);
  alert('Đã sao chép prompt.');
}
function profile(){
  const answered=answeredCount();
  const aiKeys=Object.keys(state.answers).filter(k=>k.startsWith('ai'));
  const aiAnswered=aiKeys.filter(k=>String(state.answers[k]).trim()).length;
  const completion=Math.min(100, answered/TOTAL_FIELDS*100);
  const score=Math.min(100, Math.round(completion*0.7 + (state.submitted?20:0) + Math.min(aiAnswered,4)*2));
  return {answered,ai:aiAnswered,score};
}
document.addEventListener('DOMContentLoaded',()=>{
  bindAutosave();
  const s=document.getElementById('studentName'); if(s && !s.value) s.focus();
});
