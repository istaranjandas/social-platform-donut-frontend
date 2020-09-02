import React, { Component } from "react";
import "./TicketDashboard.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NewTicketEditor from "./NewTicketEditor";
import data from "../../../assets/jsonData/tickets";
import TicketContent from "./TicketContent/TicketContent";
import Navigation from "../../dashboard/navigation/navigation";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

class TicketDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "all",
      all: [...data],
      open: [],
      pending: [],
      onHold: [],
      solved: [],
      closed: [],
      editorMode: false,
    };
  }

  componentDidMount() {
    this.setState({
      open: this.state.all.filter((ele) => ele.genres.indexOf("open") !== -1),
      pending: this.state.all.filter(
        (ele) => ele.genres.indexOf("pending") !== -1
      ),
      onHold: this.state.all.filter(
        (ele) => ele.genres.indexOf("onHold") !== -1
      ),
      solved: this.state.all.filter(
        (ele) => ele.genres.indexOf("solved") !== -1
      ),
      closed: this.state.all.filter(
        (ele) => ele.genres.indexOf("closed") !== -1
      ),
    });
  }

  handleSearchBarChange = (e) => {};

  handleViewChange = (atrb) => {
    this.setState({
      view: atrb,
    });
  };

  toggleNewTicketEditor = (open) => {
    this.setState({
      editorMode: open,
    });
  };

  render() {
    const { view } = this.state;
    return (
      <div className="ticket">
        <div className="navigation">
          <Navigation />
        </div>
        <div className="ticket-details">
          <div className="ticket-description">
            <div className="dashboard-title">Tickets</div>
            {!this.state.editorMode && (
              <React.Fragment>
                <div className="searchbar-container">
                  <div className="searchbar">
                    <span class="searchbar-icon">
                      <SearchOutlinedIcon />
                    </span>
                    <Form>
                      <Form.Control
                        as="input"
                        placeholder="Search Tickets"
                        onChange={this.handleSearchBarChange}
                      />
                    </Form>
                  </div>
                  <Button onClick={()=>this.toggleNewTicketEditor(true)}>New Ticket</Button>
                </div>
                <div className="ticket-status">
                  <div className="tabs__container">
                    <span className="nav__tab container">
                      <ul className="nav__list__container">
                        {[
                          { view: "all", opt: "All Tickets" },
                          { view: "open", opt: "Open" },
                          { view: "pending", opt: "Pending" },
                          { view: "onHold", opt: "On Hold" },
                          { view: "solved", opt: "Solved" },
                          { view: "closed", opt: "Closed" },
                        ].map((ele, index) => (
                          <li
                            key={index}
                            className={
                              view === ele.view
                                ? "nav__single__tab selected"
                                : "nav__single__tab"
                            }
                            onClick={() => this.handleViewChange(ele.view)}
                          >
                            {ele.opt}
                          </li>
                        ))}
                      </ul>
                    </span>
                  </div>
                </div>
                <div className="ticket-content">
                  <TicketContent tickets={this.state[this.state.view]} />
                </div>
              </React.Fragment>
            )}
            {this.state.editorMode && <NewTicketEditor cancel={()=>this.toggleNewTicketEditor(false)} />}
          </div>
        </div>
      </div>
    );
  }
}

export default TicketDashboard;
