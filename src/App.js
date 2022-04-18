import TokenProvider from "./context/TokenContext";
import Home from "./pages/Home";
import { Router } from "@reach/router";
import Activities from "./pages/Activities";
import Details from "./pages/Details";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Calender from "./pages/Calender";
import Content from "./pages/Content";

function App() {
  return (
    <TokenProvider>
      <div className="App">
        <Router>
          <Home path="/"/>
          <Activities path="/activities"/>
          <Details path="/details/:id"/>
          <Search path="/search"/>
          <Login path="/login"/>
          <Calender path="/calender"/>
          <Content path="content/:id"/>
        </Router>
      </div>
    </TokenProvider>
  );
}

export default App;
