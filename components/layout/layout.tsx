import { Fragment } from "react";
import Footer from "./footer";
import NavBar from "./navbar";

const Layout = (props) => {
    const styles = { minHeight: "100vh", paddingTop: "60px" };
    return (
        <Fragment>
            <NavBar />

            <main style={styles} className="mt-1">
                {props.children}
            </main>

            <Footer />
        </Fragment>
    );
};

export default Layout;
