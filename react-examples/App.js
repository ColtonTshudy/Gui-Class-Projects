import logo from './logo.svg';
import './App.css';
import SimpleComponents from "./components/SimpleComponents";
import PassingCallback from "./components/PassingCallback";
import MyComponent from "./components/ExploringState";




function App() {
  return (
    <div className="App">
      <SimpleComponents/>
        <PassingCallback/>
        <MyComponent />
    </div>
  );
}

export default App;
