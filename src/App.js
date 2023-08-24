import { BrowserRouter as Router ,Route, Routes} from 'react-router-dom';
import './App.css';
import Create from './components/Create';
import Navbar from './components/Navbar';
import Read from './components/Read';
import Update from './components/Update';


function App() {
  return (
    <div className="App">
    <Router>
    <Navbar/>
      <Routes>
        <Route exact path='/' element={<Create/>}/>
        <Route  path='/read' element={<Read/>}/>
        <Route  path='/edit/:id' element={<Update/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
