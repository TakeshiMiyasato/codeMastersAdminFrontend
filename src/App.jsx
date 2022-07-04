
import './App.css';
import Header from './components/Header';
import RoutesParadox from './config/RoutesParadox'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <Router>
        <Header />
        <RoutesParadox />
      </Router>
    </Container>
  );
}

export default App;