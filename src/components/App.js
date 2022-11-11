import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import NoPage from "./NoPage";

function App() {
  return (
    <div className="page">
            <Routes>
        <Route path="/">
        <Route index element={<Header />} />
 {/*            <Route path="admin" element={<AdminPanel />} />
          <Route path="terminal" element={<Terminal />} /> */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
