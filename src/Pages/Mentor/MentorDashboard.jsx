import React, { useContext } from "react";
import NavBar from "../../Components/NavBar";
import styled from "styled-components";
import { Link } from "react-router-dom";
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
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  ${mobile({ flexDirection: "column", display:'block' })}

`;

const Container = styled.div`
  height: 250px;
  width: 250px;
  margin: 20px;
  border: 1px solid #375160;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Round = styled.div`
  height: 95%;
  width: 95%;
  background-color: #375160;
  border-radius: 50%;
`;
const H3 = styled.h3`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none !important;
  text-align: center;
`;

function MentorDashboard() {
  let contextData = useContext(UserContext);
  return (
    <>
      <NavBar data={localStorage.getItem("username")} />
      <Wrapper>
        <Top>
          <H1>MENTOR DASHBOARD</H1>
        </Top>
        <Bottom>
          <Link to={"/mentor/add-assignment"}>
            <Container>
              <Round>
                <H3> Add Assignment</H3>
              </Round>
            </Container>
          </Link>
          
          <Link to={"/mentor/view-submitted-assignments"}>
            <Container>
              <Round>
                <H3>View Submitted Assignments</H3>
              </Round>
            </Container>
          </Link>
          <Link to={`/viewprofile/${localStorage.getItem("username")}`}>
            <Container>
              <Round>
                <H3> View Profile</H3>
              </Round>
            </Container>
          </Link>
          <Link to={"/changepassword"}>
            <Container>
              <Round>
                <H3>Change Password</H3>
              </Round>
            </Container>
          </Link>
        </Bottom>
      </Wrapper>
    </>
  );
}

export default MentorDashboard;
