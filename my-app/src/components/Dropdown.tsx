import React from 'react'

export default function AppDropdown(props:any){
 
  const options= [
        3 , 5, 10
    ]
  
    const [option, setOption] = React.useState(options[0])
    function onOption(o:number){
      setOption(o)
      if(props.onSelect){props.onSelect(o)} //comunic. esterno
    }
    return(

      <div className="dropdown d-flex-inline">
      <p className='d-inline user-select-none'>Mostra </p>
      <a className="btn btn-primary dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
        {option}
      </a>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        {options.map(o => <li key={o} onClick={() => onOption(o)}><a className="dropdown-item">{o}</a></li>)}
      </ul>
      <p className='d-inline'> </p>
    </div>
              
    );
}