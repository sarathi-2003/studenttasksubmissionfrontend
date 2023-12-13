import "../../App.css";
import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { config } from "../../config";
import NavBar from "../../Components/NavBar";
import UserContext from "../../usercontext";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  ${mobile({ textAlign: 'center' })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
  ${mobile({ textAlign: 'center' })}

`;
const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;
const TaskTitle = styled.h2`
  margin-top: 15px;
  cursor: pointer;
`;

const A = styled.a`
  display: flex;
  font-size: 24px;
  margin: 10px 20px;
  width: 50%;
  

`;

function ViewSubmittedAssignments() {
  let contextData = useContext(UserContext);
  const [assignments, setAssignments] = useState([]);
  let navigate = useNavigate();
  const fetchData = async () => {
    const res = await axios.get(
      `${config.api}/api/mentor/view-submitted-assignments`,
      {
        headers: {
          Authorization: `${localStorage.getItem("react_app_token")}`,
        },
      }
    );
    if (res.data.length === 0) alert("No Assignments Added!");
    setAssignments(res.data);
  };

  let handleDelete = async (id) => {
    let res = await axios.delete(
      `${config.api}/api/mentor/view-submitted-assignments/${id}`,
      {
        headers: {
          Authorization: `${localStorage.getItem("react_app_token")}`,
        },
      }
    );
    alert(res.data.message);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  // console.log(assignments);

  return (
    <>
      <NavBar data={localStorage.getItem("username")} />
      <Wrapper>
        <Top>
          <H1>MENTOR VIEW SUBMITTED ASSIGNMENT</H1>
        </Top>
        <Bottom>
          <LoginWrapper>
            <Title>VIEW SUBMITTED ASSIGNMENT</Title>
            <Form>
              {assignments.map((assignment) => {
                return (
                  <Accordion style={{ backgroundColor: "#27333b2e" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{
                        display: "flex",
                        justifyContent: "spaceBetween",
                      }}
                    >
                      <Typography
                        style={{
                          color: "#375160",
                          fontWeight: "600",
                          position: "relative",
                        }}
                      >
                        {assignment.title}
                      </Typography>
                      <Tooltip
                        style={{
                          display: "flex",
                          position: "absolute",
                          right: 50,
                          top: 5,
                        }}
                        title="Delete"
                      >
                        <IconButton>
                          <DeleteIcon
                            onClick={() => handleDelete(assignment._id)}
                          />
                        </IconButton>
                      </Tooltip>
                    </AccordionSummary>

                    <AccordionDetails style={{ backgroundColor: "white" }}>
                      {assignment.submitted.map((item) => {
                        return (
                          <TaskContainer>
                            <Accordion
                              style={{
                                backgroundColor: "#27333b2e",
                                width: "100%",
                              }}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{ width: "100%" }}
                              >
                                <TaskTitle>
                                  Student Name:{`${item.studentName}`}{" "}
                                </TaskTitle>
                              </AccordionSummary>
                              <AccordionDetails
                                style={{
                                  backgroundColor: "white",
                                  width: "100%",
                                }}
                              >
                                <TaskTitle>Submitted Links:</TaskTitle>
                                {item.assignmentLinks.map((link) => {
                                  return (
                                    <A
                                      href={`${link}`}
                                      target="_blank"
                                    >{`${link}`}</A>
                                  );
                                })}
                              </AccordionDetails>
                            </Accordion>
                          </TaskContainer>
                        );
                      })}
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Form>
          </LoginWrapper>
        </Bottom>
      </Wrapper>
    </>
  );
}

export default ViewSubmittedAssignments;
