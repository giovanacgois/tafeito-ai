import "./App.css";
import AuthProvider from "./provider/authProvider";

import Routes from "./routes";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <SnackbarProvider maxSnack={3}>
        <Routes />
        </SnackbarProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
