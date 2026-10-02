import {initial,KEY,parse,type State} from './domain'
export type Read = {kind:'ok';raw:string|null;state:State}|{kind:'invalid';raw:string;state:State}|{kind:'unavailable';raw:null;state:State}
export function read():Read {try {const raw=window.localStorage.getItem(KEY);if(raw===null)return {kind:'ok',raw,state:initial()};try{return {kind:'ok',raw,state:parse(raw)}}catch{return {kind:'invalid',raw,state:initial()}}}catch{return {kind:'unavailable',raw:null,state:initial()}}}
export function write(state:State){try{window.localStorage.setItem(KEY,JSON.stringify(state));return true}catch{return false}}
