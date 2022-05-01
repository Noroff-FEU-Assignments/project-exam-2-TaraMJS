import './App.css';
import Navigation from './components/layout/Navigation';
import {AuthProvider} from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
     <Navigation />
    </AuthProvider>
  )
}

export default App;
