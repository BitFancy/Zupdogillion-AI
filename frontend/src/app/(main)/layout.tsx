import React from "react";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="bg-[#090e14]">{children}</div>;
};

export default MainLayout;
