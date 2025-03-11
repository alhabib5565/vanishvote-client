import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="py-10">
      <Outlet />
    </div>
  );
};

export default App;
