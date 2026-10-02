export const KEY = 'northstar-findability-v1'
export const vocabulary = ['bicycle','commute','urban','wheel','coast','sunrise','poster','portrait'] as const
export type Tag = typeof vocabulary[number]
export const assets = [
 {id:'A01',title:'Bicycle route study',type:'Illustration',collection:'Field notes',tags:['bicycle','urban'],evidence:'Original route diagram; bicycle subject.'},
 {id:'A02',title:'Morning commuter',type:'Illustration',collection:'Field notes',tags:['commute','urban'],evidence:'Original rider illustration. Intake omitted the bicycle tag.'},
 {id:'A03',title:'Bicycle wheel detail',type:'Illustration',collection:'Workshop',tags:['bicycle','wheel'],evidence:'Original component study; not a complete rider or bicycle scene.'},
 {id:'A04',title:'Coast at sunrise',type:'Poster',collection:'Field notes',tags:['coast','sunrise','poster'],evidence:'Original coastal graphic.'},
 {id:'A05',title:'Urban portrait',type:'Poster',collection:'Workshop',tags:['urban','portrait','poster'],evidence:'Original face silhouette.'},
 {id:'A06',title:'Sunrise route',type:'Illustration',collection:'Workshop',tags:['sunrise','commute'],evidence:'Original abstract route; no bicycle depicted.'},
] as const
export type Id = typeof assets[number]['id']
export type Edit = {kind:'tags';id:Id;before:Tag[];after:Tag[]} | {kind:'policy';before:boolean;after:boolean}
export type State = {version:1;revision:number;tags:Record<Id,Tag[]>;synonyms:boolean;history:Edit[]}
export type View = {query:string;type:string;collection:string;scope:'all'|'title'|'tags'}
export const initialView:View = {query:'bicycle',type:'All',collection:'All',scope:'all'}
export function initial():State {return {version:1,revision:0,tags:Object.fromEntries(assets.map(a=>[a.id,[...a.tags]])) as Record<Id,Tag[]>,synonyms:true,history:[]}}
export function apply(state:State,edit:Edit):State {return {...state,revision:state.revision+1,tags:edit.kind==='tags'?{...state.tags,[edit.id]:[...edit.after]}:state.tags,synonyms:edit.kind==='policy'?edit.after:state.synonyms,history:[...state.history,edit]}}
const equal=(a:unknown,b:unknown)=>JSON.stringify(a)===JSON.stringify(b)
const keys=(v:object,w:string[])=>equal(Object.keys(v).sort(),w.sort())
const isTags=(v:unknown):v is Tag[]=>Array.isArray(v)&&v.length<=vocabulary.length&&new Set(v).size===v.length&&v.every(t=>vocabulary.includes(t))
export function parse(raw:string):State {
 const s:unknown=JSON.parse(raw)
 if(!s||typeof s!=='object'||!keys(s,['version','revision','tags','synonyms','history']))throw Error('Unknown state fields')
 const x=s as State
 if(x.version!==1||!Number.isSafeInteger(x.revision)||x.revision<0||typeof x.synonyms!=='boolean'||!Array.isArray(x.history)||x.history.length!==x.revision||!x.tags||typeof x.tags!=='object'||!keys(x.tags,assets.map(a=>a.id))||!Object.values(x.tags).every(isTags))throw Error('Invalid state contract')
 let replay=initial()
 for(const h of x.history){
  if(!h||typeof h!=='object')throw Error('Invalid history')
  if(h.kind==='tags'){
   if(!keys(h,['kind','id','before','after'])||!assets.some(a=>a.id===h.id)||!isTags(h.before)||!isTags(h.after)||!equal(replay.tags[h.id],h.before)||equal(h.before,h.after))throw Error('Inconsistent tag history')
  }else if(h.kind==='policy'){
   if(!keys(h,['kind','before','after'])||typeof h.before!=='boolean'||typeof h.after!=='boolean'||h.before!==replay.synonyms||h.before===h.after)throw Error('Inconsistent policy history')
  }else throw Error('Unknown history kind')
  replay=apply(replay,h)
 }
 if(!equal(replay.tags,x.tags)||replay.synonyms!==x.synonyms)throw Error('State disagrees with history')
 return x
}
const tokens=(s:string):string[]=>s.toLowerCase().match(/[a-z0-9]+/g)||[]
export function explain(id:Id,state:State,view:View){
 const a=assets.find(a=>a.id===id)!
 return tokens(view.query).map(term=>{
  const expanded=state.synonyms&&term==='bike'?['bike','bicycle']:[term]
  const fields:string[]=[]
  if(view.scope!=='tags'&&expanded.some(t=>tokens(a.title).includes(t)))fields.push('title')
  if(view.scope!=='title'&&expanded.some(t=>state.tags[id].includes(t as Tag)))fields.push('tags')
  return {term,expanded,fields}
 })
}
export function queryMatch(id:Id,state:State,view:View){return explain(id,state,view).every(t=>t.fields.length>0)}
export function search(state:State,view:View){return assets.filter(a=>queryMatch(a.id,state,view)&&(view.type==='All'||view.type===a.type)&&(view.collection==='All'||view.collection===a.collection))}
export const fixtures = [
 {name:'Full bicycle scene',query:'bicycle',expected:['A01','A02']},
 {name:'Everyday terminology',query:'bike',expected:['A01','A02']},
 {name:'Coastal poster',query:'coast',expected:['A04']},
 {name:'Urban portrait',query:'urban portrait',expected:['A05']},
] as const
export function evaluate(state:State){return fixtures.map(f=>{const found=search(state,{...initialView,query:f.query}).map(a=>a.id);const useful=found.filter(id=>(f.expected as readonly string[]).includes(id));const missing=f.expected.filter(id=>!found.includes(id));return {...f,found,useful,missing}})}
export function inverse(h:Edit):Edit{return h.kind==='tags'?{...h,before:h.after,after:h.before}:{kind:'policy',before:h.after,after:h.before}}
