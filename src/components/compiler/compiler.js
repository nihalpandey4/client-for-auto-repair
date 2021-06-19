import React, { Component } from "react";
import "./Compiler.css";

import axios from "axios";
export default class Compiler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ``,
      output: ``,
      class_name: ``,
      test_cases: ``,
      color:"grey"
    };
  }
  input = (event) => {
    event.preventDefault();
    this.setState({ input: event.target.value,color:"grey", output:""});
  };
  updateTestCases = (event) => {
    event.preventDefault();
    this.setState({ test_cases: event.target.value,color:"grey", output:""});
  };
  updateClassName = (event) => {
    event.preventDefault();
    this.setState({ class_name: event.target.value,color:"grey", output:"" });
  };

  submit = async (e) => {
    e.preventDefault();
    this.setState({output:" Processing ...." })
    const req_body = {
      code:encodeURIComponent("package example;\n"+this.state.input),
      class_name:this.state.class_name,
      test_cases:encodeURIComponent("package example;\n"+this.state.test_cases)
    }
    
    const response = await axios.post("http://localhost:3001/submit_code_and_test_cases",req_body);
    console.log(response);
    if(response.data.error){
      this.setState({output:response.data.error,color:"red"});
    } 
    else{
      this.setState({output:response.data.corrected_code,color:"green"})
    }
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
              <textarea id="output" style={{color:this.state.color}} value={this.state.output} disabled></textarea>
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