function MyHeader(props) {
  const list = props.value.map(element => (<li key={element}>{element}</li>))
  return (
    <ul>{ list }</ul>
  )
}

function App() {
  const data = ['value 1', 'value 2', 'value 3']
  return (
    <MyHeader value={data}/>
  );
}

export default App;