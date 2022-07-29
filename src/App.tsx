import "spectre.css";
import "./App.css";
import { BookingForm } from "./components/BookingForm";

function App() {
  return (
    <div className="App">
      <header className="hero hero-sm bg-primary ">
        <div className="hero-body text-center">
          <div className="container grid-md">
            <h1>Book an appointment</h1>
          </div>
        </div>
      </header>
      <BookingForm />
    </div>
  );
}

export default App;
