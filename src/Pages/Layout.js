import React from 'react';
import Header from "./HeaderFun";
import Footer from "./FooterFun";
import HomePage from "./HomePage";
class Layout extends React.Component {
    render() {
        return (
            <>
                <Header/>
                <HomePage />
                <Footer/>
            </>
        );
    }
}

export default Layout;