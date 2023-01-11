import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import JobList from './components/jobList/JobList';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/job-list' element={<JobList />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
