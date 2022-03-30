import { Component } from "react";

class Profile extends Component {

  render() {

    return (
      <> 
        {this.props.user ? 
        <>
        <h2>{this.props.user.username}</h2>
        <h2>{this.props.user.email}</h2>
        </> : null }
      </>
    )
    /* TODO: render information about logged in user */
    /* STRETCH TODO: if no logged in user then redirect home */
    // return <p>Profile page coming soon</p>
  }
};

export default Profile;
