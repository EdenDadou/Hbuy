import React, { Component } from 'react';
import { Text, View, Item, Button } from 'native-base';
import { StyleSheet, Image, ActivityIndicator} from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import _Annonces from './_Annonces';



export default class _AnnoncesList extends Component{

    constructor(props) {
        super(props)
        this.state = {
            DataAnnonces: [],
            loading: true,
        }
    }


    
    
    async componentDidMount() {
        return fetch('http://www.h-buy.fr/App/getAnnonces.php')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({DataAnnonces: responseJson, loading: false})
                
            })
            .catch((error) => {
                console.log(error);
            });
            

    }



    render() {

        const { DataAnnonces, loading } = this.state;


        if (!loading) {
            return <FlatList style={{}}
                data={DataAnnonces}
                renderItem={({item, index})=><_Annonces navigation={this.props.navigation} annonces={item} index={index}/>}
                keyExtractor={(item) => item.id.toString()}
                />
        } else {
            return <ActivityIndicator style={{margin:100}}/>
        }

    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 9,
        color: 'black'
    },
    name: {
        fontSize: 20,
        marginBottom: 5,
        color: 'white'
    },
    info: {
        fontSize: 15,
        margin: 2,
        color: 'white'
    }
})

