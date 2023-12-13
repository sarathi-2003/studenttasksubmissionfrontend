import React from "react";
import NavBar from "../../Components/NavBar";
import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./createStudent.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { config } from "../../config";
import { mobile } from "../../responsive";


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
  ${mobile({ textAlign:'center' })}

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
  ${mobile({ width:'100%' })}

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const FormWrapper = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column"})}

`;
const FormLeft = styled.div`
  flex: 1;
  margin: 10px;
`;
const FormRight = styled.div`
  flex: 1;
  margin: 10px;
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

function CreateMentor() {
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

  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phonenumber: "",
      emailid: "",
      username: "",
      password: "",
      confirmPassword: "",
      id:'',
      isMentor: true,
    },
    onSubmit: async (values) => {
      try {
        if (values.password === values.confirmPassword) {
          const user = await axios.post(
            `${config.api}/api/auth/addMentor`,
            values,{
              headers:{
                'Authorization' : `${localStorage.getItem('react_app_token')}`
              }
            }
          );
          alert(user.data.message);
          navigate("/admin-dashboard");
        } else {
          alert("Password and Confirm Password are not same");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <NavBar data={localStorage.getItem("username")}/>
      <Wrapper>
        <Top>
          <H1>ADMIN DASHBOARD</H1>
        </Top>
        <Bottom>
          <LoginWrapper>
            <Title>CREATE MENTOR</Title>
            <Form onSubmit={formik.handleSubmit}>
              <FormWrapper>
                <FormLeft>
                  <InputItem>
                    <Label>First Name</Label>
                    <Input
                      placeholder="firstname"
                      name="firstname"
                      onChange={formik.handleChange}
                      value={formik.values.firstname}
                    />
                  </InputItem>
                  <InputItem>
                    <Label>Last Name</Label>
                    <Input
                      placeholder="lastname"
                      name="lastname"
                      onChange={formik.handleChange}
                      value={formik.values.lastname}
                    />
                  </InputItem>
                  <InputItem>
                    <Label>Phone Number</Label>
                    <Input
                      type={"text"}
                      placeholder="phonenumber"
                      name="phonenumber"
                      onChange={formik.handleChange}
                      value={formik.values.phonenumber}
                    />
                  </InputItem>
                  <InputItem>
                    <Label>Email ID</Label>
                    <Input
                      type={"mail"}
                      placeholder="emailid"
                      name="emailid"
                      onChange={formik.handleChange}
                      value={formik.values.emailid}
                    />
                  </InputItem>
                </FormLeft>
                <FormRight>
                <InputItem>
                    <Label>ID</Label>
                    <Input
                      placeholder="id"
                      name="id"
                      onChange={formik.handleChange}
                      value={formik.values.id}
                    />
                  </InputItem>
                  <InputItem>
                    <Label>UserName</Label>
                    <Input
                      placeholder="username"
                      name="username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                  </InputItem>
                  <InputItem id="passwordField">
                    <Label>Password </Label>
                    <Input
                      type="password"
                      placeholder={"password"}
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <VisibilityIcon
                      onClick={() => viewPassword()}
                      id="passwordIcon"
                    />
                  </InputItem>
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
                </FormRight>
              </FormWrapper>
              <Button type="submit">CREATE</Button>
            </Form>
          </LoginWrapper>
        </Bottom>
      </Wrapper>
    </>
  );
}

export default CreateMentor;
