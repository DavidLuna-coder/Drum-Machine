import "./App.css";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";

const displayReducer = (state = { display: "" }, action) => {
  if (action.type === "DISPLAY") {
    return { display: action.text };
  } else return state;
};

const displayAction = (state) => ({ type: "DISPLAY", text: state });

const store = createStore(displayReducer);
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <DrumMachine />
      </div>
    </Provider>
  );
}

function DrumMachine() {
  return (
    <div id="drum-machine">
      <div id="drum-container">
        <DrumButtons
          triggerKey="Q"
          sound="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
          name="one"
        />
        <DrumButtons
          triggerKey="W"
          sound="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
          name="two"
        />
        <DrumButtons
          triggerKey="E"
          sound="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
          name="three"
        />
        <DrumButtons
          triggerKey="A"
          sound="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
          name="four"
        />
        <DrumButtons
          triggerKey="S"
          sound="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
          name="five"
        />
        <DrumButtons
          triggerKey="D"
          sound="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
          name="six"
        />
        <DrumButtons
          triggerKey="Z"
          sound="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
          name="seven"
        />
        <DrumButtons
          triggerKey="X"
          sound="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
          name="eight"
        />
        <DrumButtons
          triggerKey="C"
          sound="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
          name="nine"
        />
      </div>

      <DrumConfig></DrumConfig>
    </div>
  );
}

class DrumButtons extends React.Component {
  constructor(props) {
    super(props);
    this.handleAudio = this.handleAudio.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleAudio() {
    const audio = document.getElementById(this.props.triggerKey);
    audio.currentTime = 0;
    audio.play();
    store.dispatch(displayAction(this.props.name))
  }

  handleKeyPress(e) {
    if (e.key === this.props.triggerKey) {
      this.handleAudio();
    }
  }

  render() {
    return (
      <button
        id={this.props.name}
        className="drum-pad"
        onClick={this.handleAudio}
      >
        <audio
          id={this.props.triggerKey}
          className="clip"
          src={this.props.sound}
        ></audio>
        {this.props.triggerKey}
      </button>
    );
  }
}

function DrumConfig() {
  const textToDisplay = useSelector(state => state.display);
  return (
    <div id="drum-config">
      <div id="display">{textToDisplay}</div>
    </div>
  );
}
export default App;
