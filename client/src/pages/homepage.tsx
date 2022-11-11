import { useNavigate } from "react-router-dom";
import "./homepage.css";

function HomePage() {
  let navigate = useNavigate();

  const navigateToVacationsPage = () => {
    navigate("/vacations");
  };

  return (
    <>
      <main className="wrapper">
        <div className="container">
          <div className="titles">
            <div className="maintitle">
              <h1>Welcome To Vacation Website</h1>
            </div>
            <div className="subtitle">
              <h3>Here you can find the most exclusive vacations on web!</h3>
            </div>
          </div>
          <div className="button">
            <input
              type="button"
              className="btn-toMain"
              onClick={navigateToVacationsPage}
              value="LETS GO!"
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default HomePage;
