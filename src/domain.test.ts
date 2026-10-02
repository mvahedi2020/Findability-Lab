import {describe,it,expect} from 'vitest'
import {initial,apply,parse,search,initialView,evaluate,inverse,explain} from './domain'
describe('independent labeled search expectations',()=>{
 it('returns exact baseline IDs and usefulness denominator',()=>{const e=evaluate(initial())[0];expect(e.found).toEqual(['A01','A03']);expect(e.useful).toEqual(['A01']);expect(e.missing).toEqual(['A02'])})
 it('corrects one record without changing expected labels or original evidence',()=>{const s=initial();const next=apply(s,{kind:'tags',id:'A02',before:s.tags.A02,after:[...s.tags.A02,'bicycle']});const e=evaluate(next)[0];expect(e.found).toEqual(['A01','A02','A03']);expect(e.useful.length/e.found.length).toBe(2/3);expect(e.missing.length/e.expected.length).toBe(0);expect(next.tags.A01).toEqual(s.tags.A01);expect(e.expected).toEqual(['A01','A02'])})
 it('only expands bike and retains directional scope',()=>{expect(search(initial(),{...initialView,query:'bike'}).map(a=>a.id)).toEqual(['A01','A03']);expect(search({...initial(),synonyms:false},{...initialView,query:'bike'})).toEqual([]);expect(explain('A01',initial(),{...initialView,query:'bike'})[0]).toEqual({term:'bike',expanded:['bike','bicycle'],fields:['title','tags']})})
 it('requires every whole token and excludes evidence',()=>{expect(search(initial(),{...initialView,query:'urban portrait'}).map(a=>a.id)).toEqual(['A05']);expect(search(initial(),{...initialView,query:'bicy'})).toEqual([]);expect(search(initial(),{...initialView,query:'omitted'})).toEqual([])})
 it('combines facets and separates scope',()=>{expect(search(initial(),{...initialView,type:'Poster'})).toEqual([]);expect(search(initial(),{...initialView,query:'commuter',scope:'tags'})).toEqual([]);expect(search(initial(),{...initialView,query:''}).length).toBe(6)})
 it('control query calculations remain stable',()=>{expect(evaluate(initial()).slice(2).map(e=>[e.useful.length,e.found.length,e.missing.length,e.expected.length])).toEqual([[1,1,0,1],[1,1,0,1]])})
})
describe('journal contract',()=>{
 it('round trips valid edited history',()=>{const s=initial();const n=apply(s,{kind:'tags',id:'A02',before:s.tags.A02,after:[...s.tags.A02,'bicycle']});expect(parse(JSON.stringify(n))).toEqual(n)})
 it('undo appends only the latest inverse',()=>{const s=initial();const e={kind:'policy' as const,before:true,after:false};const n=apply(apply(s,e),inverse(e));expect(n.synonyms).toBe(true);expect(n.tags).toEqual(s.tags);expect(parse(JSON.stringify(n)).revision).toBe(2)})
 for(const [name,mutate] of [
  ['unknown version',(s:ReturnType<typeof initial>)=>({...s,version:2})],
  ['unknown ID',(s:ReturnType<typeof initial>)=>({...s,tags:{...s.tags,X:[]}})],
  ['missing ID',(s:ReturnType<typeof initial>)=>({...s,tags:{A01:[]}})],
  ['unknown tag',(s:ReturnType<typeof initial>)=>({...s,tags:{...s.tags,A02:['secret']}})],
  ['duplicate tag',(s:ReturnType<typeof initial>)=>({...s,tags:{...s.tags,A02:['urban','urban']}})],
  ['unlogged correction',(s:ReturnType<typeof initial>)=>({...s,tags:{...s.tags,A02:['bicycle']}})],
  ['bad revision',(s:ReturnType<typeof initial>)=>({...s,revision:1})],
  ['unknown field',(s:ReturnType<typeof initial>)=>({...s,extra:true})],
  ['wrong before',(s:ReturnType<typeof initial>)=>({...s,revision:1,history:[{kind:'policy',before:false,after:true}]})],
  ['unknown history',(s:ReturnType<typeof initial>)=>({...s,revision:1,history:[{kind:'delete'}]})],
 ] as const)it(`rejects ${name}`,()=>expect(()=>parse(JSON.stringify(mutate(initial())))).toThrow())
 it('rejects malformed JSON',()=>expect(()=>parse('{')).toThrow())
})
