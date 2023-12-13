
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  justify-content: flex-end;
  font-weight: 600;
  font-size: 20px;
  ${mobile({flexDirection: 'column'})}

`;

const LogoutBtn = styled.button`
  border: none;
  padding: 10px 20px;
  background-color: #375160;
  color: white;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
`;

const H3 = styled.h3`
  color: #375160;
  margin-right: 20px;
`;

function NavBar(props) {
  let contextData = useContext(UserContext);
  const navigate = useNavigate();
  const doLogout = () => {
    localStorage.removeItem("react_app_token");
    localStorage.removeItem("username");
    navigate("/");
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <H1>Student Task Submission Portal</H1>
        </Left>
        <Right>
          <H3>{props.data}</H3>
          <LogoutBtn onClick={() => doLogout()}>LOGOUT</LogoutBtn>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default NavBar;