import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import UserContext from "../usercontext";

const Container = styled.div`
  height: 60px;
  background-color: whitesmoke;
  ${mobile({height: '130px'})}
`;

const Wrapper = styled.div`
padding: 15px 20px;
display: flex;
align-items: center
justify-content: space-between;
`;

const Left = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
`;

const H1 = styled.h1`
  color: #375160;
  font-weight: 600;
  font-size: 24px;
  cursor: pointer;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 20px;
  ${mobile({flexDirection: 'column'})}
`;

const Student = styled.a`
  color: #375160;
  flex: 1;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  &::after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background: #000;
    transition: width 0.3s;
  }
  &:hover::after {
    width: 100%;
    transition: width 0.3s;
  }
  ${mobile({marginBottom: '20px'})}
`;
const Mentor = styled.a`
  color: #375160;
  flex: 1;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  &::after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background: #000;
    transition: width 0.3s;
  }
  &:hover::after {
    width: 100%;
    transition: width 0.3s;
  }
  ${mobile({marginBottom: '20px'})}

`;
const Admin = styled.a`
  color: #375160;
  flex: 1;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  &::after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background: #000;
    transition: width 0.3s;
  }
  &:hover::after {
    width: 100%;
    transition: width 0.3s;
  }
  ${mobile({marginBottom: '20px'})}

`;

function LoginNav() {
  let contextData = useContext(UserContext);
  return (
    <Container>
      <Wrapper>
        <Left>
          <H1>Student Task Submission Portal</H1>
        </Left>
        <Right>
          <Link to={"/"}>
            <Student onClick={() => contextData.setLoginType("STUDENT")}>
              Student
            </Student>
          </Link>
          <Link to={"/"}>
            <Mentor onClick={() => contextData.setLoginType("MENTOR")}>
              Mentor
            </Mentor>
          </Link>
          <Link to={"/"}>
            <Admin onClick={() => contextData.setLoginType("ADMIN")}>
              Admin
            </Admin>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default LoginNav;