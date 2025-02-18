import { BrowserRouter,Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Body from "./components/Body";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
          <Routes>
             <Route path="/" element= {<Body></Body>}>
                <Route path="/" element={<Feed/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/profile" element={<Profile/>}></Route>
                <Route path="/connections" element={<Connections/>}></Route>
                <Route path="/requests" element={<Requests/>}></Route>
             </Route>
          </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
