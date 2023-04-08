import './App.css';
import LoginForm from './components/LoginForm';

function App() {
  // const [user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   return FirebaseAuthService.subscribeToAuthChanges(setUser);
  // }, [])

  return (
    <div className="App">
      <div className="title-row">
        <h1 className="title">Firebase Recipes</h1>
        <LoginForm />
      </div>
    </div>
  );
}

export default App;
