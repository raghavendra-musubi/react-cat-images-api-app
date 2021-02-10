import "./styles.css";
import React from "react";

// Presentation Component
const CatImage = (props) => {
  return <img src={props.meowUrl} alt="random-meow" />;
};

// Container Component
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      meowUrls: []
    };
  }

  componentDidMount() {
    fetch("https://aws.random.cat/meow")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.file);
        this.setState({ meowUrls: [...this.state.meowUrls, data.file] });
      });
  }

  addMeow = () => {
    fetch("https://aws.random.cat/meow")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ meowUrls: [...this.state.meowUrls, data.file] });
      });
  };

  deleteMeow = () => {
    this.setState({ meowUrls: this.state.meowUrls.slice(1) });

    if (this.state.meowUrls.length === 1) {
      fetch("https://aws.random.cat/meow")
        .then((response) => response.json())
        .then((data) => {
          this.setState({ meowUrls: [...this.state.meowUrls, data.file] });
        });
    }
  };

  render() {
    return (
      <div className="pussy-column">
        <button onClick={this.addMeow}> Add Meow </button>
        <button onClick={this.deleteMeow}> Delete Meow </button>
        {this.state.meowUrls &&
          this.state.meowUrls.map((meowUrl, index) => (
            <CatImage key={index} meowUrl={meowUrl} />
          ))}
      </div>
    );
  }
}

export default App;
