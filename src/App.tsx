import { Button, Typography } from '@mui/material';
import './App.css';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import firebase from './FirebaseConfig';

function App() {
  return (
    <div className="App">
      <Typography variant="h1">Firebase Recipes</Typography>
      <Button variant="contained">Hello world</Button>
    </div>
  );
}

export default App;
