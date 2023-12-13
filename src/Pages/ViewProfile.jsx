import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import styled from "styled-components";
import "./Admin/createStudent.css";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { config } from "../config";
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
  ${mobile({ width: "100%" })}

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const FormWrapper = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}

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

function ViewProfile() {
  let { username } = useParams();
  const [user, setUser] = useState([]);

  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phonenumber: "",
      emailid: "",
      username: "",
      id: "",
      username: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.firstname) {
        errors.firstname = "Please enter firstname";
      }
      if (!values.lastname) {
        errors.lastname = "Please enter lastname";
      }
      if (!values.phonenumber) {
        errors.phonenumber = "Please enter phonenumber";
      }
      if (!values.emailid) {
        errors.emailid = "Please enter emailid";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const user = await axios.put(
          `${config.api}/api/auth/viewprofile/${values.id}`,
          values,
          {
            headers: {
              Authorization: `${localStorage.getItem("react_app_token")}`,
            },
          }
        );
        alert(user.data.message);
      } catch (error) {
        console.log(error);
      }
    },
  });
  let getUser = async (username) => {
    let res = await axios.get(
      `${config.api}/api/auth/viewprofile/${username}`,
      {
        headers: {
          Authorization: `${localStorage.getItem("react_app_token")}`,
        },
      }
    );
    setUser(res.data);
    formik.setValues(res.data);
  };
  useEffect(() => {
    getUser(username);
  }, []);

  return (
    <>
      <NavBar data={localStorage.getItem("username")} />
      <Wrapper>
        <Top>
          <H1>VIEW PROFILE</H1>
        </Top>
        <Bottom>
          <LoginWrapper>
            <Title>VIEW PROFILE</Title>
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
                  {formik.errors.firstname ? (
                    <span className="errors">{formik.errors.firstname}</span>
                  ) : null}
                  <InputItem>
                    <Label>Last Name</Label>
                    <Input
                      placeholder="lastname"
                      name="lastname"
                      onChange={formik.handleChange}
                      value={formik.values.lastname}
                    />
                  </InputItem>
                  {formik.errors.lastname ? (
                    <span className="errors">{formik.errors.lastname}</span>
                  ) : null}
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
                  {formik.errors.phonenumber ? (
                    <span className="errors">{formik.errors.phonenumber}</span>
                  ) : null}
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
                  {formik.errors.emailid ? (
                    <span className="errors">{formik.errors.emailid}</span>
                  ) : null}
                </FormLeft>
                <FormRight>
                  <InputItem>
                    <Label>ID</Label>
                    <Input
                      placeholder="id"
                      name="id"
                      onChange={formik.handleChange}
                      value={formik.values.id}
                      disabled
                    />
                  </InputItem>
                  <InputItem>
                    <Label>UserName</Label>
                    <Input
                      placeholder="username"
                      name="username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      disabled
                    />
                  </InputItem>
                </FormRight>
              </FormWrapper>
              <Button type="submit">UPDATE</Button>
            </Form>
          </LoginWrapper>
        </Bottom>
      </Wrapper>
    </>
  );
}

export default ViewProfile;