// App.tsx
import React from "react";

import RandomQuote from "./components/GetRandomQuote";


const App: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center py-10 px-5">
      <RandomQuote />
    </div>
  );
};

export default App;
