import LoginForm from "../components/LoginForm";

function LoginPage({ userType }) {
  return (
    <>
      <LoginForm userType={userType} />
    </>
  );
}

export default LoginPage;


