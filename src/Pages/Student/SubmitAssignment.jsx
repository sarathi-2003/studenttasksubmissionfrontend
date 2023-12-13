import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 600px;
`;

const ListWrapper = styled.div`
  padding: 10px;
  width: 70%;
  background-color: white;
  ${mobile({ width: "100%" })}

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

const LinkContainer = styled.form`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;
const TaskTitle = styled.h2`
  margin-top: 15px;
`;
const Label = styled.label`
  font-size: 20px;
`;
const TaskInput = styled.input`
  margin: 15px 20px;
  width: 80%;
  font-size: 20px;
  font-weight: 500;
  padding: 10px;
`;
const TaskSubmit = styled.button`
  padding: 10px 20px;
  margin: 15px;
  border: none;
  background-color: #375160;
  color: white;
  font-weight: 500;
  cursor: pointer;
`;

function SubmitAssignment() {
  const [assignments, setAssignments] = useState([]);
  const [links, setLinks] = useState([]);

  let contextData = useContext(UserContext);
  let { taskId } = useParams();
  let fetchAssignments = async () => {
    let res = await axios.get(
      `${
        config.api
      }/api/student/submit-assignment/${taskId}/${localStorage.getItem(
        "username"
      )} `,
      {
        headers: {
          Authorization: `${localStorage.getItem("react_app_token")}`,
        },
      }
    );
    // console.log(res.data);
    setAssignments(res.data);
    setLinks(res.data.links);
  };
  useEffect(() => {
    fetchAssignments();
  }, []);
  let formik = useFormik({
    initialValues: {
      taskid: taskId,
      username: contextData.username,
      link1: "",
      link2: "",
      link3: "",
      link4: "",
      isenabled: false,
    },
    validate: (values) => {
      let errors = {};
      if (!values.link1) {
        errors.link1 = "Please enter Submission Link";
      }
      if (!values.link2) {
        errors.link2 = "Please enter Submission Link";
      }

      return errors;
    },
    onSubmit: async (values) => {
      
      let link = [values.link1, values.link2, values.link3, values.link4];
      values.link = link;
      try {
        let res = await axios.put(
          `${config.api}/api/student/submit-assignment/${taskId}`,
          values,
          {
            headers: {
              Authorization: `${localStorage.getItem("react_app_token")}`,
            },
          }
        );
        alert(res.data.message);
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
          <H1>STUDENT SUBMIT ASSIGNMENT</H1>
        </Top>
        <Bottom>
          <ListWrapper>
            <Title>SUBMIT ASSIGNMENT</Title>
            <TaskTitle>{assignments.title}</TaskTitle>
            <LinkContainer onSubmit={formik.handleSubmit}>
              {/* {
                links.map((item)=>{
                    return(<>
                        <Label>{item}</Label>
                        <TaskInput/>
                    </>)
                })
            } */}

              {links[0] ? (
                <>
                  <Label>{links[0]}</Label>
                  <TaskInput
                    placeholder={`${links[0]}`}
                    onChange={formik.handleChange}
                    value={formik.values.link1}
                    name="link1"
                  />
                  {formik.errors.link1 ? (
                    <span className="errors">{formik.errors.link1}</span>
                  ) : null}
                </>
              ) : null}
              {links[1] ? (
                <>
                  <Label>{links[1]}</Label>
                  <TaskInput
                    placeholder={`${links[1]}`}
                    onChange={formik.handleChange}
                    value={formik.values.link2}
                    name="link2"
                  />
                  {formik.errors.link2 ? (
                    <span className="errors">{formik.errors.link2}</span>
                  ) : null}
                </>
              ) : null}
              {links[2] ? (
                <>
                  <Label>{links[2]}</Label>
                  <TaskInput
                    placeholder={`${links[2]}`}
                    onChange={formik.handleChange}
                    value={formik.values.link3}
                    name="link3"
                  />
                  {formik.errors.link2 ? (
                    <span className="errors">{formik.errors.link2}</span>
                  ) : null}
                </>
              ) : null}
              {links[3] ? (
                <>
                  <Label>{links[3]}</Label>
                  <TaskInput
                    placeholder={`${links[3]}`}
                    onChange={formik.handleChange}
                    value={formik.values.link4}
                    name="link4"
                  />
                  {formik.errors.link2 ? (
                    <span className="errors">{formik.errors.link2}</span>
                  ) : null}
                </>
              ) : null}
              <TaskSubmit type="submit"> Submit</TaskSubmit>
            </LinkContainer>
          </ListWrapper>
        </Bottom>
      </Wrapper>
    </>
  );
}

export default SubmitAssignment;