import { ToastContainer } from "react-toastify";

import Global from "./styles/global";
import MainRoutes from "./routes";
import UserProvider from "./contexts/UserContext";
import TechProvider from "./contexts/TechContext";

const App = () => (
  <>
    <Global />
    <ToastContainer />
    <UserProvider>
      <TechProvider>
        <MainRoutes />
      </TechProvider>
    </UserProvider>
  </>
);

export default App;
