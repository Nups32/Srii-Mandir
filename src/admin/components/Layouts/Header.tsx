// import React, { useState } from "react";
// import { MenuOutlined } from "@ant-design/icons";
import { Col, Layout, Row } from "antd";
import { NavLink } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const { Header } = Layout;

// interface NavbarProps {
//   collapsed: boolean;
//   toggleSidebar: () => void;
//   disableHoverEffect: () => void;
// }

// interface RouteData {
//   title: string;
//   symbol: string;
//   points: string;
// }

// const Navbar: React.FC<NavbarProps> = ({ collapsed, toggleSidebar, disableHoverEffect }) => {
const Navbar = () => {
  const firstName = localStorage.getItem("user") || ""; // default to empty string if user is not available
  // const username = localStorage.getItem("username") || ""; // default to empty string if user is not available
  const formattedFirstName = firstName.replace(/["']/g, "");
  // const lastname = localStorage.getItem("lastname") || "";
  // const formattedlastname = lastname.replace(/["']/g, "");
  // const location = useLocation();
  // const [headerName, setHeaderName] = useState("");
  // const matchingPoints = parseInt(localStorage.getItem("matchingPair") || "0");

  // const ButtonStyle = {
  //   marginTop: "18px",
  //   background: "transparent",
  // };

  return (
    // <Header className="bg-linear-to-t from-green-200 to-blue-200" >
    // <Header className="bg-[#181616]!" >
    <Header className="bg-orange-400!" >
      <Row className="">
        {/* <Col xs={4} md={2}>
          <Button
            type="text"
            icon={<MenuOutlined className='header-icon' />}
            style={ButtonStyle}
            // onClick={() => {
            //   toggleSidebar();
            //   disableHoverEffect();
            // }}
            className='m-2'
          />
        </Col> */}
        {/* <Col xs={10} md={11} className="mt-1"> */}
          {/* <span className='font-semibold text-xs sm:text-2xl text-uppercase inline-block'>{headerName}</span> */}
        {/* </Col> */}
        <Col xs={17} sm={17} md={15} xl={15} xxl={15}>
          <NavLink to="/" className="main-logo flex items-center shrink-0">
            <img className="h-15 w-auto flex-none" src={logo} alt="logo" />
          </NavLink>
        </Col>
        <Col xs={7} sm={7} md={9} xl={9} xxl={9} className="flex justify-end">
          <span className="font-semibold text-xs sm:text-2xl p-3 text-gray-100 font-roboto">
            Hey {formattedFirstName || "admin"}
          </span>
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
