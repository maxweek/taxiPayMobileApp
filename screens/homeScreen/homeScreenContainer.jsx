import React, { Component } from "react";
import HomeScreen from "./homeScreen";
import { setUserLoggedOut, setUserSelectedAccount } from "../../store/user/actions";
import { connect } from "react-redux";

class HomeScreenContainer extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <HomeScreen
        navigation={this.props.navigation}
        status={this.props.route.params !== undefined ? this.props.route.params.status : false}
        setUserLoggedOut={this.props.setUserLoggedOut}
        setUserSelectedAccount={this.props.setUserSelectedAccount}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  setUserLoggedOut,
  setUserSelectedAccount
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreenContainer);
