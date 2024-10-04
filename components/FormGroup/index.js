const FormGroup = ({ children, classes }) => {
  return <div className={`mb-4 ${classes || ""}`}>{children}</div>;
};

export default FormGroup;
