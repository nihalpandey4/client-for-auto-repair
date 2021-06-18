import React, { Component } from "react";
import "./Compiler.css";
export default class Compiler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ``,
      output: ``,
      class_name: ``,
      test_cases: ``,
    };
  }
  input = (event) => {
    event.preventDefault();
    console.log(this.state); 
    this.setState({ input: event.target.value });
  };
  updateTestCases = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.setState({ test_cases: event.target.value });
  };
  updateClassName = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.setState({ class_name: event.target.value });
  };

  submit = async (e) => {
    e.preventDefault();
    let outputText = document.getElementById("output");
    outputText.innerHTML = "";
    outputText.innerHTML += "Creating Submission ...\n";
    console.log(this.state);
    }
  render() {
    return (
      <>
        <div className="row container-fluid">
          <div className="col-6 ml-4 ">
            <label>
              <span className="badge badge-info heading mt-2 ">
                <i className="fas fa-code fa-fw fa-lg"></i> Code Here
              </span>
            </label>
            <textarea
              required
              name="solution"
              id="source"
              onChange={this.input}
              className="source"
            ></textarea>

            <button
              type="submit"
              className="btn btn-danger ml-2 mr-2 "
              onClick={this.submit}
            >
              <i className="fas fa-cog fa-fw"></i> Repair
            </button>

            <label className="mr-1">
              <b className="heading">Java ClassName : </b>
            </label>
            <input
              value={this.state.class_name}
              onChange={this.updateClassName}
              className="form-control form-inline mb-2 language"
            />
          </div>
          <div className="col-5">
            <div>
              <span className="badge badge-info heading my-2 ">
                <i className="fas fa-exclamation fa-fw fa-md"></i> Corrected code
              </span>
              <textarea id="output" disabled></textarea>
            </div>
          </div>
        </div>

        <div className="mt-2 ml-5">
          <span className="badge badge-primary heading my-2 ">
            <i className="fas fa-user fa-fw fa-md"></i> Enter test cases here
          </span>
          <br />
          <textarea id="input" onChange={this.updateTestCases} value={this.state.test_cases}></textarea>
        </div>
      </>
    );
  }
}