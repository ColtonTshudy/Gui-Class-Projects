const Readout = ({ selected }) =>{
  const listElements = selected.map(el => <li>{el}</li>);

  return(
      <div id={"readout"}> The following boxes are selected:
          <ul className={"listRoot"}>
              {listElements}
          </ul>
      </div>
  )
}

export default Readout;