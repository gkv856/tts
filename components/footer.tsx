const Footer = () => {
    return (
        <div className="row bg-dark">
            <div className="container border border-light p-4">
                <div className="row text-light">
                    <div className="col-md-4 py-3">
                        <h6>Address</h6>
                        <i className="bi bi-geo-alt-fill"> New Delhi</i>
                    </div>
                    <div className="col-md-4 py-3">
                        <h6>Phone</h6>
                        <i className="bi bi-telephone-fill"> +91 99998 76543</i>
                    </div>
                    <div className="col-md-4 py-3">
                        <h6>Email</h6>
                        <i className="bi bi-envelope-fill">
                            {" "}
                            hello@speechai.com
                        </i>
                    </div>
                </div>

                <div className="row">
                    <div className="col py-3 text-light">
                        All rights reserved by SPEECHAI
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
