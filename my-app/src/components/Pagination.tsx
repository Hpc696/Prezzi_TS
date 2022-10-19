import React from "react"
import '../assets/App.css'
interface IPagination{
    pages : number;
    pagesize : number;
    currentpage : number;
    onChange : (n: number) => void;
}

export default function AppPagination(props:IPagination){
    let pages= props.pages; 
    let pagesize= props.pagesize;
    let currentpage= props.currentpage; 
    let prevclass= currentpage===1 ? 'disabled' : '' ;
    function prevPage(){ //dico a funz prevpage di richiamare funzione nel caso (if)-1 nell app.js 
        if(currentpage>1) //evito click su bottone previous quando non ho pagine prima da vedere rispetto alla corrente 
        props.onChange(currentpage=-1)
    } //console.log(props)
    function nextPage(){
        if(currentpage<pages){
            props.onChange(currentpage=1)
        }
    }
    return(
       
       <nav aria-label="Page navigation example" className="d-flex-inline">
            <ul className="pagination justify-content-end">
                <li onClick={prevPage} className={prevclass + "paginat page-item pointer"}><a className=" user-select-none page-link" /*href="#"*/>Previous</a></li>
                <li className="p-2 page-item user-select-none">{currentpage}</li>
                <li onClick={nextPage} className={( currentpage>=pages ? 'disabled ' : '' ) + "paginat page-item pointer"}><a className=" user-select-none page-link" /*href="#"*/>Next</a></li>
            </ul> {/*evitare click anche su bottone next quando non ho piu pagine dopo da vedere*/}
        </nav>
    
    )
}