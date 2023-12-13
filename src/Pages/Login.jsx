import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginNav from "../Components/LoginNav";
import { config } from "../config";
import { mobile } from "../responsive";
import UserContext from "../usercontext";

const Container = styled.div``;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${mobile({width: '100%  '})}
`;

const Top = styled.div`
  height: 70px;
  background-color: #375160;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const H1 = styled.h1`
  color: white;
  font-size: 30px;
  font-weight: 600px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const H2 = styled.h2``;
const H3 = styled.h3``;
const Middle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
`;

const LoginWrapper = styled.div`
  padding: 20px;
  width: 25%;
  background-color: white;
  ${mobile({width: '80%'})}

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #375160;
  color: white;
  padding: 10px;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: #375160;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link1 = styled.a`
  margin: 5px 0px;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
  position: absolute;
  bottom: -20px;
`;

function Login() {
  let navigate = useNavigate();
  let contextData = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.username) {
        errors.username = "Please enter username";
      }
      if (!values.password) {
        errors.password = "Please enter password";
      }
      return errors;
    },

    onSubmit: async (values) => {
      // console.log(contextData.loginType);
      //Check for Student
      contextData.setUsername(values.username);
      localStorage.setItem("username", values.username);
      if (contextData.loginType === "STUDENT") {
        try {
          const user = await axios.post(`${config.api}/api/student`, values);
          localStorage.setItem("react_app_token", user.data.token);
          alert(user.data.message);
          if (user.data.message === "Successfully logged in!") {
            navigate("/student-dashboard");
          }
        } catch (error) {
          console.log(error);
        }
      }

      //Check for Mentor
      if (contextData.loginType === "MENTOR") {
        try {
          const user = await axios.post(`${config.api}/api/mentor`, values);
          localStorage.setItem("react_app_token", user.data.token);
          alert(user.data.message);
          if (user.data.message === "Successfully logged in!") {
            navigate("/mentor-dashboard");
          }
        } catch (error) {
          console.log(error);
        }
      }

      //Check for Admin
      if (contextData.loginType === "ADMIN") {
        try {
          const user = await axios.post(`${config.api}/api/admin`, values);
          localStorage.setItem("react_app_token", user.data.token);
          alert(user.data.message);
          if (user.data.message === "Successfully logged in!") {
            navigate("/admin-dashboard");
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  });
  return (
    <Container>
      <LoginNav />
      <Wrapper>
        <Top>
          <H1>Login</H1>
        </Top>
        <Middle>
          <LoginWrapper>
            <Title>{contextData.loginType}</Title>
            <Form onSubmit={formik.handleSubmit}>
              <Input
                placeholder="username"
                name="username"
                values={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.errors.username ? (
                <span className="errors">{formik.errors.username}</span>
              ) : null}
              <Input
                type={"password"}
                placeholder="password"
                name="password"
                values={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password ? (
                <span className="errors">{formik.errors.password}</span>
              ) : null}
              <Button type="submit">LOGIN</Button>
              {contextData.loginType === "STUDENT" ? (
                <Div>
                  <H2>For Testing:</H2>
                  <H3>Student Username: student02 / student03 </H3>
                  <H3>Student Password: 12344 / 12344 </H3>
                </Div>
              ) : contextData.loginType === "MENTOR" ? (
                <Div>
                  <H2>For Testing:</H2>
                  <H3>Mentor Username: Mentor01 / mentor02 </H3>
                  <H3>Mentor Password: 123 / 123 </H3>
                </Div>
              ) : contextData.loginType === "ADMIN" ? (
                <Div>
                  <H2>For Testing:</H2>
                  <H3>Admin Username: Admin01 / admin03 </H3>
                  <H3>Admin Password: 123 / 123 </H3>
                </Div>
              ) : null}
            </Form>
          </LoginWrapper>
        </Middle>
      </Wrapper>
    </Container>
  );
}

export default Login;