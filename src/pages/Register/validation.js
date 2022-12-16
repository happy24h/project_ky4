const validation = (values) => {
    let errors = {};
    if (!values.email) {
        errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is invalid.';
    }
    if (!values.password) {
        errors.password = 'Password is required.';
    } else if (values.password.length < 5) {
        errors.password = 'Password must be more than five characters.';
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = ' Confirm password is required.';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords does not match';
    }

    return errors;
};
export default validation;
