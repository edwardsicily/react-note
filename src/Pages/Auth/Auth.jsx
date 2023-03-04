import React from "react";
import Login from "../../components/Login/Login";
import "../../style/Auth.scss";
import Layout from "../../Layout/Layout";

function Auth() {
  return (
    <Layout>
      <div className="auth-wrapper">
        <Login />
      </div>
    </Layout>
  );
}

export default Auth;
