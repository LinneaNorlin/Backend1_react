import './App.css';
import { Route, Routes } from 'react-router-dom'
import IssueDetailsView from './components/IssueDetailsView';
import IssueForm from './components/IssueForm';


function App() {
  return (
    <Routes>
      <Route path='/' element={ 
        <IssueForm />
      } />
      <Route path='/details/:id' element={ 
        <IssueDetailsView />
      } />
    </Routes>
  );
}

export default App;
