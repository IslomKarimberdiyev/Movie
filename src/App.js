import './App.css';
import {BrowserRouter} from "react-router-dom";
import Router from "./component/router/router";


function App(props) {

  return (
      <BrowserRouter>
          <div className="App">
              <Router/>
          </div>
      </BrowserRouter>
  );
}

export default App;

