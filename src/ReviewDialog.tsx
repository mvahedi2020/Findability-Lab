import {useEffect,useRef,type ReactNode} from 'react'
export function ReviewDialog({title,children,onCancel,onConfirm}:{title:string;children:ReactNode;onCancel:()=>void;onConfirm:()=>void}){
 const ref=useRef<HTMLDialogElement>(null)
 useEffect(()=>{const d=ref.current!;d.showModal();d.querySelector<HTMLButtonElement>('button')?.focus();return()=>d.close()},[])
 return <dialog ref={ref} aria-labelledby="review-title" onCancel={e=>{e.preventDefault();onCancel()}}><div className="dialog-head"><span className="eyebrow">REVIEW BEFORE SAVING</span><h2 id="review-title">{title}</h2></div>{children}<div className="dialog-actions"><button onClick={onCancel}>Cancel</button><button className="primary" onClick={onConfirm}>Confirm change</button></div></dialog>
}
