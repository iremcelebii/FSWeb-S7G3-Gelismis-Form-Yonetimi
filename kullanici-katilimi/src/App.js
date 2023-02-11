import React, { useState } from "react";
import Form from "./Form";
import "./App.css";

function App() {
  const [uyeListesi, setUyeListesi] = useState([
    {
      isim: "irem",
      email: "iremcelebi2404@gmail.com",
      sifre: "irem1234",
      kullanımSarti: true,
    },
    {
      isim: "sena",
      email: "senacelebi@gmail.com",
      sifre: "sena1234",
      kullanımSarti: true,
    },
    {
      isim: "oğuzhan",
      email: "oguzhancelebi@gmail.com",
      sifre: "ogi1234",
      kullanımSarti: true,
    },
  ]);

  return (
    <div className="App">
      <Form></Form>
    </div>
  );
}

export default App;
