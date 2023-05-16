import Navbar from "./NavBar";
import "../css/HomeScreen.css";
import "../css/NavBar.css";

const HomeScreen = () => {

    return (
      <div className="homescreen-container">
        <Navbar />
        <div className="content-container">
          <div className="content-header">
            <h1>At Home Screen</h1>
          </div>
          <div className="content-body">
          </div>
        </div>
      </div>
    );

};

export default HomeScreen;
