import React, { Component } from 'react';
import { Text, View, Item, Button } from 'native-base';
import { StyleSheet, Image, ActivityIndicator} from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import _News from './_News';



export default class _NewsList extends Component{

    constructor(props) {
        super(props)
        this.state = {
            DataNews: [],
            loading: true,
        }
    }


    
    
    async componentDidMount() {
        return fetch('http://www.h-buy.fr/App/getNews.php')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                DataNews: responseJson, loading: false
            })
                
            })
            .catch((error) => {
                console.log(error);
            });
            

    }



    render() {

        const { DataNews, loading } = this.state;


        if (!loading) {
            return <FlatList style={{}}
                data={DataNews}
                renderItem={({item})=><_News navigation={this.props.navigation} news={item}/>}
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

