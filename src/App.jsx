import { Route, Routes } from "react-router-dom";
import Layout from "./Pages/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Statistics from "./Pages/Statistics/Statistics";
import Users from "./Pages/Users/Users";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/users" element={<Users />} /> 
        </Route>
      </Routes>
    </>
  );
}

export default App;
