import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// custom tools
import LabPreview from "../LabPreview";
// styles
import api from "../../api/APIHandler";
import "./../../styles/form.css";

class FormArtist extends Component {
  state = {
    name: "",
    description: "",
    style: "",
    isBand: "",
    styles: []
  };

  componentDidMount = () => {
    api
      .get("/styles")
      .then(apiRes => {
        this.setState({ styles: apiRes.data.styles });
      })
      .catch(dbErr => console.log("OUPS! ERROR: ", dbErr));

    if(this.props._id) {
      api
        .get(`/artists/${this.props._id}`)
        .then(apiRes => {
          console.log(apiRes);
          console.log(apiRes.data);
          this.setState({
            name: apiRes.data.name,
            description: apiRes.data.description,
            style: apiRes.data.style,
            isBand: apiRes.data.isBand
          });
        })
        .catch(apiErr => console.log(apiErr));
    }
  };

  updateState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props);
    if (this.props._id) {
      api
        .patch(`/artists/${this.props._id}`, {
          name: this.state.name,
          description: this.state.description,
          style: this.state.style,
          isBand: this.state.isBand
        })
        .then(apiRes => console.log(apiRes))
        .catch(apiErr => console.log(apiErr));
    } else {
      api
        .post("/artists", {
          name: this.state.name,
          description: this.state.description,
          style: this.state.style,
          isBand: this.state.isBand
        })
        .then(apiRes => {
          console.log(this.state);
          console.log("NEW ARTIST CREATED! ", apiRes);
        })
        .catch(apiErr => {
          console.log("ERROR WHILE CREATING ARTIST: ", apiErr);
        });
    }
  };

  render() {
    return (
      <>
        <h1 className="title diy">D.I.Y (FormArtist)</h1>
        <form
          className="form"
          method="post"
          onChange={this.updateState}
          onSubmit={this.handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="input"
            defaultValue={this.state.name}
          />

          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            className="input"
            defaultValue={this.state.description}
          />

          <label htmlFor="style">Style</label>
          <select name="style" id="style" className="input">
            <option value="">Select style</option>
            {/* Below: IN CASE OF EDIT FORM */}
            {/* <option selected>{this.state.style}</option> */}
            {this.state.styles.map((s, i) => (
              <option key={i} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>

          <label htmlFor="isBand">Is Band ?</label>
          <div className="radio">
            <label htmlFor="isBand">Yes</label>
            <input type="radio" name="isBand" id="yes" value="true" />
            <label htmlFor="isBand">No</label>
            <input type="radio" name="isBand" id="no" value="false" />
          </div>

          <button className="btn" type="submit">
            Submit
          </button>
        </form>

        <LabPreview name="artistForm" isSmall />
        <hr />
      </>
    );
  }
}

export default withRouter(FormArtist);
