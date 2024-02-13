import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Crud from "./Components/Crud";
import Create from "./Components/Create";
import Read from "./Components/Read";
import Edit from "./Components/Edit";

const App = () => {
  return (
    <div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Crud />} />
            <Route path="/crud/create" element={<Create />} />
            <Route path="/crud/read/:id" element={<Read />} />
            <Route path="/crud/update/:id" element={<Edit />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
