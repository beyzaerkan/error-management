import { Link } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div className="App">
      <Link to="/terminals">terminals</Link>
      <br />
      <Link to="/terminal">login</Link>
    </div>
  );
}

export default App;
