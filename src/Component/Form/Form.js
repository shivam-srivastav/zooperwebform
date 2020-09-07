import React from "react";
import img from "../../Assets/Zopper.png";
import "./Form.css";
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true,
      text: "",
      error: "",
      searchBy: "",
    };
  }
  validate = (event) => {
    if (event.target.value === "name") {
      if (!this.state.text || !this.state.text.match(/^[a-zA-Z]+$/)) {
        this.setState({
          error: "Name is not empty and it should be alphabet only",
          status: false,
        });
      } else {
        this.setState({ error: "", status: true, searchBy: "name" });
      }
    }
    if (event.target.value === "email") {
      if (!this.state.text || !this.state.text.includes("@")) {
        this.setState({ error: "Email must contain @ letter", status: false });
      } else {
        this.setState({ error: "", status: true, searchBy: "email" });
      }
    }
    if (event.target.value === "phone") {
      if (
        !this.state.text ||
        !this.state.text.match(
          /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/
        )
      ) {
        if (this.state.text.length < 11)
          this.setState({
            error: "Phone must be 10 digit numerical value",
            status: false,
          });
      } else {
        this.setState({ error: "", status: true, searchBy: "phone" });
      }
    }
  };
  onHandleSubmit = async () => {
    if (this.state.status) {
      let res = await fetch("https://jsonplaceholder.typicode.com/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          body: JSON.stringify({
            text: this.state.text,
            searchBy: this.state.searchBy,
          }),
        },
      }).then((res) => console.log(res));
      console.log(res);
    } else {
      console.log(this.state.error);
    }
  };
  render() {
    return (
      <div className="web-form">
        <img id="img" src={img} alt="" />
        <h1 id="heading">Sample Form</h1>
        <form>
          <p id="error">{this.state.error}</p>
          <input
            id="text-feild"
            type="text"
            placeholder="Search"
            value={this.state.value}
            onChange={(event) => {
              this.setState({ text: event.target.value });
            }}
          ></input>
          <div id="search-by">
            <p>Search by</p>
            <input
              type="radio"
              value="name"
              name="search"
              onClick={this.validate}
            />
            Name
            <input
              type="radio"
              name="search"
              value="email"
              onClick={this.validate}
            />
            Email
            <input
              type="radio"
              name="search"
              value="phone"
              onClick={this.validate}
            />
            Phone
          </div>
          <button id="search" type="submit">
            {" "}
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
