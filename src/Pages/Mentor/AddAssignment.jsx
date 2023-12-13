import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { config } from "../../config";
import NavBar from "../../Components/NavBar";
import UserContext from "../../usercontext";
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
  ${mobile({ textAlign: "center" })}
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

const CheckboxWrapper = styled.div`
  display: flex;
  ${mobile({ display: "flex", flexDirection: "column" })}
`;
const Checkbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const CheckboxLabel = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #375160;
  margin: 10px 20px;
  flex: 1;
`;

const CheckboxInput = styled.input``;

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

function AddAssignment() {
  let contextData = useContext(UserContext);

  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      title: "",
      assignmentLinks: [],
    },
    validate: (values) => {
      let errors = {};
      if (!values.title) {
        errors.title = "Please enter Title";
      }
      if (values.assignmentLinks.length === 0) {
        errors.assignmentLinks = "Please select atleast one";
      }

      return errors;
    },
    onSubmit: async (values) => {
      // console.log(values);
      try {
        const user = await axios.post(
          `${config.api}/api/mentor/add-assigment`,
          values,
          {
            headers: {
              Authorization: `${localStorage.getItem("react_app_token")}`,
            },
          }
        );
        alert(user.data.message);
        //   navigate("/admin-dashboard");
      } catch (error) {
        console.log(error);
      }
    },
  });
  var form = document.getElementById("myForm");

  return (
    <>
      <NavBar data={localStorage.getItem("username")} />
      <Wrapper>
        <Top>
          <H1>MENTOR ADD ASSIGNMENT</H1>
        </Top>
        <Bottom>
          <LoginWrapper>
            <Title>ADD ASSIGNMENT</Title>
            <Form onSubmit={formik.handleSubmit} id="myForm">
              <InputItem>
                <Label>Assignment Title </Label>
                <Input
                  type="text"
                  placeholder={"assignment title"}
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
              </InputItem>
              {formik.errors.title ? (
                <span className="errors">{formik.errors.title}</span>
              ) : null}

              <InputItem id="group">
                <Label>Links to be Submitted </Label>
                <CheckboxWrapper>
                  <Checkbox>
                    <CheckboxLabel htmlFor="frontend-deployed">
                      <CheckboxInput
                        id="frontend-deployed"
                        type="checkbox"
                        name="assignmentLinks"
                        onChange={formik.handleChange}
                        value="FrontEnd Deployed Link"
                      />
                      FrontEnd Deployed URL
                    </CheckboxLabel>
                  </Checkbox>

                  <Checkbox>
                    <CheckboxLabel htmlFor="frontend-github">
                      <CheckboxInput
                        id="frontend-github"
                        type="checkbox"
                        name="assignmentLinks"
                        onChange={formik.handleChange}
                        value="Frontend GitHub URL"
                      />
                      FrontEnd Github URL
                    </CheckboxLabel>
                  </Checkbox>

                  <Checkbox>
                    <CheckboxLabel htmlFor="backend-deployed">
                      <CheckboxInput
                        id="backend-deployed"
                        type="checkbox"
                        name="assignmentLinks"
                        onChange={formik.handleChange}
                        value="Backend Deployed Link"
                      />
                      BackEnd Deployed URL
                    </CheckboxLabel>
                  </Checkbox>

                  <Checkbox>
                    <CheckboxLabel htmlFor="backend-github">
                      <CheckboxInput
                        id="backend-github"
                        type="checkbox"
                        name="assignmentLinks"
                        onChange={formik.handleChange}
                        value="Backend Github URL"
                      />
                      BackEnd Github URL
                    </CheckboxLabel>
                  </Checkbox>
                </CheckboxWrapper>
              </InputItem>
              {formik.errors.assignmentLinks ? (
                <span className="errors">{formik.errors.assignmentLinks}</span>
              ) : null}
              <Button type="submit" onClick={() => form.reset()}>
                ADD
              </Button>
            </Form>
          </LoginWrapper>
        </Bottom>
      </Wrapper>
    </>
  );
}

export default AddAssignment;
