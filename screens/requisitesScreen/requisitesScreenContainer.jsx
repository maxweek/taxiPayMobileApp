import React, { Component } from "react";
import {
} from "../../store/user/actions";
import { connect } from "react-redux";
import RequisitesScreen from "./requisitesScreen";

class RequisitesScreenContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <RequisitesScreen
        navigation={this.props.navigation}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    password: state.user.password,
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequisitesScreenContainer);
