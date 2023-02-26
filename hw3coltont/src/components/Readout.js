/*
 * author: Colton Tshudy
 * version: 2/24/2023
 */

const Readout = ({ selected }) =>{
  const listElements = selected.map(el => <li key={el}>{el}</li>);

  return(
      <div id={"readout"} className="blackBorder"> The following boxes are selected:
          <ul className={"listRoot"}>
              {listElements}
          </ul>
      </div>
  )
}

export default Readout;