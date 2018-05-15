import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { 
    clearStorage 
  } from '../store/actions';
import { Button } from '../components/common';

class TaskList extends Component {

    logout() {
        this.props.clearStorage();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>
                    Task List
                </Text>
                <Button onPress={this.logout.bind(this)}>
                    Logout
                </Button>
            </View>            
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading, auth_token } = auth;
    return ({ email, password, error, loading, auth_token });
  };
  
  export default connect(mapStateToProps, { clearStorage })(TaskList);
