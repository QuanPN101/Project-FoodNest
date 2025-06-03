import { UserProvider } from "./context/UserContect";
import AppRouter from "./routers/AppRouter";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <UserProvider>
      <AppRouter/>
      <ToastContainer position="top-right" autoClose={3000} />
    </UserProvider>
  );
}

export default App;
