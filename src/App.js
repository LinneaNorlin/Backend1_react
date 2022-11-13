import './App.css';
import { Route, Routes } from 'react-router-dom'
import IssueDetailsView from './components/IssueDetailsView';
import IssueForm from './components/IssueForm';


function App() {
  return (
    <Routes>

      {/* Create issue funkar! */}
      <Route path='/' element={ 
        <IssueForm />
      } />

      {/* Länka till spec issue funkar! */}
      <Route path='/details/:id' element={ 
        <IssueDetailsView />
      } />

    </Routes>

  );
}

export default App;
