import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { config } from "../config";
import UserContext from "../usercontext";
import NavBar from "../Components/NavBar";
import { mobile } from "../responsive";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  height: 170px;
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

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
`;

const LoginWrapper = styled.div`
  padding: 10px;
  width: 70%;
  background-color: white;
  ${mobile({ width: '100%' })}

`;

const Form = styled.form`
  width: 100%;
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

const InputItem = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: 600;
  color: #375160;
  flex: 1;
`;

const Input = styled.input`
  flex: 3;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
  font-size: 20px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: #375160;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 500;
`;

function ChangePassword() {
  let contextData = useContext(UserContext);
  function viewPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  function viewConfirmPassword() {
    var y = document.getElementById("confirmPassword");
    if (y.type === "password") {
      y.type = "text";
    } else {
      y.type = "password";
    }
  }
  function viewNewPassword() {
    var z = document.getElementById("newPassword");
    if (z.type === "password") {
      z.type = "text";
    } else {
      z.type = "password";
    }
  }

  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      username: contextData.username,
    },
    validate: (values) => {
      let errors = {};
      if (!values.oldPassword) {
        errors.oldPassword = "Please enter Old Password";
      }
      if (!values.newPassword) {
        errors.newPassword = "Please enter New Password";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Please enter Confirm Password";
      }

      return errors;
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        if (values.newPassword === values.confirmPassword) {
          const user = await axios.put(
            `${config.api}/api/auth/changepassword`,
            values,
            {
              headers: {
                Authorization: `${localStorage.getItem("react_app_token")}`,
              },
            }
          );
          alert(user.data.message);
          //   navigate("/admin-dashboard");
        } else {
          alert("New Password and Confirm Password are not same");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <NavBar data={localStorage.getItem("username")} />
      <Wrapper>
        <Top>
          <H1>CHANGE PASSWORD</H1>
        </Top>
        <Bottom>
          <LoginWrapper>
            <Title>CHANGE PASSWORD</Title>
            <Form onSubmit={formik.handleSubmit}>
              <InputItem id="passwordField">
                <Label>Old Password </Label>
                <Input
                  type="password"
                  placeholder={"password"}
                  id="password"
                  name="oldPassword"
                  onChange={formik.handleChange}
                  value={formik.values.oldPassword}
                />
                <VisibilityIcon
                  onClick={() => viewPassword()}
                  id="passwordIcon"
                />
              </InputItem>
              {formik.errors.oldPassword ? (
                <span className="errors">{formik.errors.oldPassword}</span>
              ) : null}
              <InputItem id="passwordField">
                <Label>New Password </Label>
                <Input
                  type="password"
                  placeholder={"password"}
                  id="newPassword"
                  name="newPassword"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <VisibilityIcon
                  onClick={() => viewNewPassword()}
                  id="passwordIcon"
                />
              </InputItem>
              {formik.errors.newPassword ? (
                <span className="errors">{formik.errors.newPassword}</span>
              ) : null}
              <InputItem id="passwordField">
                <Label>Confirm Password </Label>
                <Input
                  type="password"
                  placeholder={"confirm password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
                <VisibilityIcon
                  onClick={() => viewConfirmPassword()}
                  id="passwordIcon"
                />
              </InputItem>
              {formik.errors.confirmPassword ? (
                <span className="errors">{formik.errors.confirmPassword}</span>
              ) : null}
              <Button type="submit">CREATE</Button>
            </Form>
          </LoginWrapper>
        </Bottom>
      </Wrapper>
    </>
  );
}

export default ChangePassword;