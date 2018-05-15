import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { 
  emailChanged, passwordChanged, loginUser, 
  logoutUser, autoSignIn, clearAuthStorage 
} from '../store/actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  componentDidMount() {
    this.props.autoSignIn();
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  logOut() {
    this.props.logoutUser();
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  renderLogOut() {
    if (this.props.auth_token) {
      return (
        <Button onPress={this.logOut.bind(this)}>
          Logout
        </Button>
      );
    }
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeHolder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeHolder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        {this.renderError()}
        <CardSection>
          {this.renderButton()}
        </CardSection>
        <CardSection>
          {this.renderLogOut()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    color: 'red',
    alignSelf: 'center'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, auth_token } = auth;
  return ({ email, password, error, loading, auth_token });
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, logoutUser, autoSignIn, clearAuthStorage
})(LoginForm);
