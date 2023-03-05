function SignIn() {
    return (
        <form action="#" className="sign-in-form">
            <h2 className="title">Sign In</h2>
            <div className="input-field">
                <i className="fas fa-user"></i>
                {/* <FontAwesomeIcon icon={faUser} /> */}

                <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Continue with Social Account</p>
            <div className="social-media">
                <a href="#" className="social-icon">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-icon">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                    <i className="fab fa-linkedin-in"></i>
                </a>
            </div>
        </form>
    );
}

export default SignIn;
