import React, { useState } from "react";
import NavBar from "./navbar";
import Category from "./category";
import TopRest from "./topRest";
import OnlineDelivery from "./OnlineDelivery";

const Parent = () => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="w-screen">
      <NavBar showSearch={showSearch} setShowSearch={setShowSearch} />
      <Category />
      <TopRest />
      <OnlineDelivery showSearch={showSearch} setShowSearch={setShowSearch} />
    </div>
  );
};

export default Parent;
