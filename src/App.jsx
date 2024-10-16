import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./Pages/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Users/Users";
import Dealers from "./Pages/Dealer/Dealers";
import Banner from "./Pages/Banner/Banner";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dealers" element={<Dealers />} />
          <Route path="/users" element={<Users />} />
          <Route path="/banners" element={<Banner />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
