import {useEffect,useRef,type ReactNode} from 'react'
export function ReviewDialog({title,children,onCancel,onConfirm}:{title:string;children:ReactNode;onCancel:()=>void;onConfirm:()=>void}){
 const ref=useRef<HTMLDialogElement>(null)
 useEffect(()=>{const d=ref.current!;d.showModal();d.querySelector<HTMLButtonElement>('button')?.focus();return()=>d.close()},[])
 return <dialog ref={ref} aria-labelledby="review-title" onKeyDown={e=>{if(e.key==='Tab'){const buttons=ref.current!.querySelectorAll<HTMLButtonElement>('button');if(e.shiftKey&&document.activeElement===buttons[0]){e.preventDefault();buttons[buttons.length-1].focus()}else if(!e.shiftKey&&document.activeElement===buttons[buttons.length-1]){e.preventDefault();buttons[0].focus()}}}} onCancel={e=>{e.preventDefault();onCancel()}}><div className="dialog-head"><span className="eyebrow">REVIEW BEFORE SAVING</span><h2 id="review-title">{title}</h2></div>{children}<div className="dialog-actions"><button onClick={onCancel}>Cancel</button><button className="primary" onClick={onConfirm}>Confirm change</button></div></dialog>
}
