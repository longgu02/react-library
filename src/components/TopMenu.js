import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  NavItem,
  NavbarBrand,
  NavbarToggler,
  NavbarText,
  Collapse,
  DropdownToggle,
  UncontrolledDropdown,
  Nav,
  DropdownItem,
  DropdownMenu
} from "reactstrap";
import { Link } from "react-router-dom";
import NumberContext from "../context/NumberContext";

export default class TopMenu extends Component {
  constructor() {
    super();
    this.state = {
      isCollapse: false
    };
    this.onClickToggle = this.onClickToggle.bind(this);
  }

  onClickToggle() {
    this.setState({
      isCollapse: !this.state.isCollapse
    });
  }

  render() {
    return (
      <div className="TopMenu">
        <Navbar color="light" expand="sm" light>
          <NavbarBrand href="/">Library</NavbarBrand>
          <NumberContext.Consumer>
            {({ queueItems }) => (
              <Link to="/queue" className="nav-link">
                Queue({queueItems.length})
              </Link>
            )}
          </NumberContext.Consumer>
          <NavbarToggler onClick={this.onClickToggle} />
          <Collapse isOpen={this.state.isCollapse} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <Link to="/" className="nav-link" onClick={this.onClickToggle}>
                  Home
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/create"
                  className="nav-link"
                  onClick={this.onClickToggle}
                >
                  Create
                </Link>
              </NavItem>
              <UncontrolledDropdown inNavbar nav>
                <DropdownToggle caret nav>
                  Options
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>Phạm Long</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
