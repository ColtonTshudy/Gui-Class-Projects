const Readout = ({ selected }) =>{
  const listElements = selected.map(el => <li>{el.value}</li>);

  return(
      <div id={"readout"} className="blackBorder"> The following boxes are selected:
          <ul className={"listRoot"}>
              {listElements}
          </ul>
      </div>
  )
}

export default Readout;