import React from "react";
// import Header from "../../lib/components/layout/header";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="h-[100vh] bg-[#0E121C]">
            {/* <Header /> */}
            {children}
        </div>
    );
};

export default AuthLayout;
