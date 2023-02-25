import './App.css';

function SelectedList(props){
  const list = props.selected.map(e => <li key={e+"list"} className={"listItems"}>{e}</li>);

  return(
      <div className={"selectedBox"}> The following boxes are selected:
          <ul className={"listU"}>
              {list}
          </ul>
      </div>
  )
}

function App() {
  return (
    <SelectedList selected={[1,2,3,4,5,6,7,7,7,7,7,7,7,7,7,7,7,7,7]}/>
  );
}

export default App;