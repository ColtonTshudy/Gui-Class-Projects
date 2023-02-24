import React, {Component} from "react";

class FrameHolder extends Component{
  /**
   * Default props
   */
  static defaultProps = {
    size: "150"
  };

  /**
   * @param props: Properties
   */
  constructor(props) {
    super(props)
    this.state = {size: this.props.size}
  }

  changeSize = () => {
    if (this.state["size"] != "150") {
      this.setState({size: 150})
    }
    else {
      this.setState({size: 250})
    }
  }

  render() {
    return(
      <div>
          <button onClick={this.changeSize}>Click me!</button>
          <div>
              <img src={`https://via.placeholder.com/${this.state["size"].toString()}`} alt={'placeholder'}/>
          </div>
          <section>
              <p>description</p>
          </section>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <FrameHolder />
    </div>
  );
}

export default App;
