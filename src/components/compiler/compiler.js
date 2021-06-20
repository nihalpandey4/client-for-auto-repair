import React, { Component } from "react";
import "./Compiler.css";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
export default class Compiler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ``,
      output: ``,
      class_name: ``,
      logs:"",
      test_cases: ``,
      submit_disabled:false,
      output_color:"grey"
    };
  }
  input = (event) => {
    event.preventDefault();
    this.setState({ input: event.target.value,output:"",logs:"",output_color:"grey" });
  };

  notify = (text) => {
    toast.success(text);
  }

  updateTestCases = (event) => {
    event.preventDefault();
    this.setState({ test_cases: event.target.value,output:"",logs:"",output_color:"grey" });
  };
  updateClassName = (event) => {
    event.preventDefault();
    this.setState({ class_name: event.target.value,output:"",logs:"",output_color:"grey" });
  };

  copyCorrectedCode = () => {
    navigator.clipboard.writeText(this.state.output);
    this.notify("Corrected code copied !");
  }

  submit = async (e) => {
    e.preventDefault();
    this.setState({submit_disabled:true});
    const req_body = {
      code: encodeURIComponent("package example;\n" + this.state.input),
      class_name: this.state.class_name,
      test_cases: encodeURIComponent("package example;\n" + this.state.test_cases)
    }

    try{
      const response = await axios.post("http://localhost:3001/submit_code_and_test_cases", req_body);
      console.log(response);
      if(response.data.error){
        this.setState({output:response.data.error,output_color:"red", logs:response.data.error})
      }
      else{
        console.log(response.data);
        this.setState({ output: response.data.corrected_code,output_color:"green", logs:response.data.logs });
      }
    }
    catch(err){
      this.setState({ output: err.message,color:"red" });
    }

    this.setState({submit_disabled:false})
    //console.log(this.state);
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

            <br /><br />

            <button
              type="submit"
              className="btn btn-danger ml-2 mr-2 "
              onClick={this.submit}
              disabled = {this.state.submit_disabled}
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

            <div >
              <span className="badge badge-primary heading my-2 ">
                <i className="fas fa-user fa-fw fa-md"></i> Enter test cases here
              </span>
              <br />
              <textarea id="input" onChange={this.updateTestCases} value={this.state.test_cases}></textarea>
            </div>

          </div>
          
          <div className="col-5">
            <ToastContainer autoClose={2000} />
            <div className="cursor" onClick={this.copyCorrectedCode}>
              <span className="badge badge-success heading my-2 ">
                <i className="fas fa-exclamation fa-fw fa-md"></i> Corrected code
              </span>
            </div>
            <textarea className="output" value={this.state.output} disabled></textarea>
            <br /> <br />

            <div className="cursor">
              <span className="badge badge-info heading my-2 ">
                <i className="fas fa-exclamation fa-fw fa-md"></i> Logs
              </span>
            </div>
            <textarea className="output mb-4" value={this.state.logs} disabled></textarea>
          </div>
          
        </div>


      </>
    );
  }
}