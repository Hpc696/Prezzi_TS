import React from 'react';
import './assets/App.css';
import { Container, Row, Col, Table} from 'react-bootstrap';
import AppDropdown from './components/Dropdown';
import AppPagination from './components/Pagination';

interface IPrezzo {
  Data: string;
  Benzina: number;
  Gasolio: number;
  Gpl: number;
}
function App() {
 
  const [prezzi, setPrezzi]=React.useState([]);

  async function initPrezzi() {
		try{
			const r = await fetch('http://localhost:4000/csv', {'mode': 'cors'});
			const j = await r.json();
			console.log(j)
			setPrezzi(j)
		} catch (err){
				console.error(err)
		}
	};

  React.useEffect(() => {
		initPrezzi() ;
	}, [])
	
	const[pagesize, setpagesize]= React.useState(3)

  const OnSelectDD = (o:number) => { 
		let currentindex= (currentpage-1)*pagesize
		setpagesize(o)
		setCurrentpage(Math.floor((currentindex/o)+1))
	}

  const[currentpage, setCurrentpage]= React.useState(1)
	const OnSelectOV = (x:number) => {
		if(x===-1){
			setCurrentpage(currentpage-1)
		} else {
			setCurrentpage(currentpage+1)
		}
	}

  return (
  <>
  <Container> 
    
    <h2> PREZZI CARBURANTI </h2>

    
    <Table bordered hover>
      <thead> 
        <tr>
					<th>Data Rilevazione</th>
					<th> Benzina </th>
					<th> Gasolio </th>
					<th> Gpl </th>	    
		    </tr>
      </thead>
      <tbody>

				{prezzi.slice((currentpage-1)*pagesize , (currentpage*pagesize)).map((p:IPrezzo , index) =>  { 

            

					return(
            
					  <tr key={index}>
					  <th scope="row" className="scope" >{p.Data}</th>
						<td>{ p.Benzina }</td>
						<td>{ p.Gasolio }</td>
						<td>{ p.Gpl }</td>
						</tr>
					 )
				})}

      </tbody>
    </Table>
    <AppDropdown onSelect={OnSelectDD} />
		<AppPagination onChange={OnSelectOV} pages={prezzi.length/pagesize} currentpage={currentpage} pagesize={pagesize}/>
  </Container>
  </>
  );
}
{/*<div className="row justify-content-center">
				<div className="col-md-6 text-center mb-5">
					<h2 className="heading-section text-uppercase font-weight-bold">Prezzi carburante</h2>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<div className="table-wrap">
						<table className="table">
					    <thead className="thead-primary bg-primary">
					      <tr className='text-white'>
					        <th>Data Rilevazione</th>
					        <th> Benzina </th>
					        <th> Gasolio </th>
					        <th> Gpl </th>
					      </tr>
					    </thead>
					    <tbody >
							 {prezzi.slice((currentpage-1)*pagesize , (currentpage*pagesize)).map((p , index) =>  { 
								return(
								 <tr key={index}>
								 <th scope="row" className="scope" >{p.Data}</th>
								 <td>{ p.Benzina }</td>
								 <td>{ p.Gasolio }</td>
								 <td>{ p.Gpl }</td>
								 </tr>
								 )
							})}
						
					    </tbody>
					  </table>
					<AppDropdown onSelect={OnSelectDD} />
					<AppOverview onChange={OnSelectOV} pages={prezzi.length/pagesize} currentpage={currentpage} pagesize={pagesize}/>   
					</div>
				</div>
			</div>
		</div>
            </section>*/}
export default App;
