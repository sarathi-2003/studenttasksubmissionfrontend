import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UserContext from "../../usercontext";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { config } from "../../config";
import Delete from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
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
  //   align-items: center;
  height: 600px;
`;

const LoginWrapper = styled.div`
  padding: 10px;
  width: 70%;
  background-color: white;
  ${mobile({ width:'100%' })}

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



function ViewUsers() {
  let contextData = useContext(UserContext);
  const [student, setStudent] = useState([]);
  const [mentor, setMentor] = useState([]);
  const [admin, setAdmin] = useState([]);
  let getStudent = async () => {
    let res = await axios.get(`${config.api}/api/admin/view-users/students`, {
      headers: {
        Authorization: `${localStorage.getItem("react_app_token")}`,
      },
    });
    setStudent(res.data);
  };
  let getAdmin = async () => {
    let res = await axios.get(`${config.api}/api/admin/view-users/admins`, {
      headers: {
        Authorization: `${localStorage.getItem("react_app_token")}`,
      },
    });
    setAdmin(res.data);
  };
  let getMentor = async () => {
    let res = await axios.get(`${config.api}/api/admin/view-users/mentors`, {
      headers: {
        Authorization: `${localStorage.getItem("react_app_token")}`,
      },
    });
    setMentor(res.data);
  };

  let handleDelete = async (id) => {
    await axios.delete(`${config.api}/api/admin/delete-user/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem("react_app_token")}`,
      },
    });
    getStudent();
    getAdmin();
    getMentor();
  };

  useEffect(() => {
    getStudent();
    getAdmin();
    getMentor();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "username", headerName: "UserName", width: 220 },
    { field: "firstname", headerName: "First name", width: 220 },
    { field: "lastname", headerName: "Last name", width: 220 },
    {
      field: "phonenumber",
      headerName: "Phone Number",
      sortable: false,
      width: 220,
    },
    {
      field: "emailid",
      headerName: "Email ID",
      sortable: false,
      width: 220,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 113,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Delete">
              <IconButton>
                <Delete onClick={() => handleDelete(params.row.id)} />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <>
      <NavBar data={localStorage.getItem("username")} />
      <Wrapper>
        <Top>
          <H1>ADMIN VIEW USERS</H1>
        </Top>
        <Bottom>
          <LoginWrapper>
            <Title>STUDENTS</Title>
            <div style={{ height: 300, width: "100%" }}>
              <DataGrid
                rows={student}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                actions={<Delete />}
                // checkboxSelection
              />
            </div>

            <Title>MENTORS</Title>
            <div style={{ height: 300, width: "100%" }}>
              <DataGrid
                rows={mentor}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // checkboxSelection
              />
            </div>

            <Title>ADMIN</Title>
            <div style={{ height: 300, width: "100%" }}>
              <DataGrid
                rows={admin}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // checkboxSelection
              />
            </div>
          </LoginWrapper>
        </Bottom>
      </Wrapper>
    </>
  );
}

export default ViewUsers;
