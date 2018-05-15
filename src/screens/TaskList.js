import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
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
            <View>
                <Text>
                    Task List
                </Text>
                <Button onPress={this.logout.bind(this)}>
                    Logout
                </Button>

                <MapView
                    style={styles.map}
                    initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                />
            </View>     
                   
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading, auth_token } = auth;
    return ({ email, password, error, loading, auth_token });
  };

const styles = {
    map: {
        height: 250,
        width: ' 100%'
    }
};
  
export default connect(mapStateToProps, { clearStorage })(TaskList);
