import React from "react";
import Navbar from "../components/layout/navbar/common/Navbar";
import Footer from "../_components/Footer/Footer";

const WebsiteLayout = (
    {
        children
    }: {
        children: React.ReactNode
    }
) => {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default WebsiteLayout;