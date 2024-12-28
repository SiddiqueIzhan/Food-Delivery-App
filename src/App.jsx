import { TfiWordpress } from "react-icons/tfi";
import "./App.css";
import Category from "./components/category";
import NavBar from "./components/navbar";
import TopRest from "./components/topRest";
import OnlineDelivery from "./components/OnlineDelivery";

function App() {
  return (
    <div className="w-screen">
      <NavBar />
      <Category />
      <TopRest />
      <OnlineDelivery />
    </div>
  );
}

export default App;
