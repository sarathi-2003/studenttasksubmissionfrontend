import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { config } from "../../config";
import NavBar from "../../Components/NavBar";
import UserContext from "../../usercontext";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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

const Status = styled.h3`
  display: flex;
  margin: 1px solid black;
  padding: 5px 10px;
  color: white;
  justify-content: space-between;
  

`;
const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;
const TaskTitle = styled.h2`
  margin-top: 15px;
`;
const TaskInput = styled.h4`
  font-size: 24px;
  font-weight: 500;
  margin-top: 10px;
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

function ViewAssignment() {
  const [assignments, setAssignments] = useState([]);
  let contextData = useContext(UserContext);
  let fetchAssignments = async () => {
    let res = await axios.get(`${config.api}/api/student/view-assignment`, {
      headers: {
        Authorization: `${localStorage.getItem("react_app_token")}`,
      },
    });
    // console.log(res);
    if (res.data.length === 0) alert("No Assignments!");
    // console.log(res.data);
    setAssignments(res.data);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  let i = 1;
  // setSubmit(true)
  return (
    <>
      <NavBar data={localStorage.getItem("username")} />
      <Wrapper>
        <Top>
          <H1>STUDENT VIEW ASSIGNMENT</H1>
        </Top>
        <Bottom>
          <ListWrapper>
            <Title>VIEW ASSIGNMENT</Title>

            {assignments.map((assignment) => {
              return (
                <Accordion style={{ backgroundColor: "#27333b2e" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ justifyContent: "space-between" }}
                  >
                    <Typography
                      style={{
                        color: "#375160",
                        fontWeight: "600",
                        position: "relative",
                      }}
                    >
                      {`ASSIGNMENT ${i++}`}
                    </Typography>

                    {assignment.submitted.map((item) => {
                      if (
                        item.studentName === localStorage.getItem("username")
                      ) {
                        return (
                          <Status
                            style={{
                              backgroundColor: "green",
                              position: "absolute",
                              right: 50,
                              top: 10,
                              padding: `6px 30px`,
                            }}
                          >
                            Submitted
                          </Status>
                        );
                      }
                    })}
                  </AccordionSummary>
                  <AccordionDetails style={{ backgroundColor: "white" }}>
                    <TaskContainer>
                      <TaskTitle>Title: {assignment.title} </TaskTitle>
                      <TaskTitle>To Submit:</TaskTitle>
                      {assignment.links.map((element) => {
                        return <TaskInput>{`${element}`}</TaskInput>;
                      })}
                      <Link
                        to={`/student/submit-assignment/${
                          assignment._id
                        }/${localStorage.getItem("username")}`}
                      >
                        <TaskSubmit>CLICK TO SUBMIT </TaskSubmit>
                      </Link>
                    </TaskContainer>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </ListWrapper>
        </Bottom>
      </Wrapper>
    </>
  );
}

export default ViewAssignment;