import React, { Component } from 'react';
import { ActivityIndicator, FlatList} from 'react-native';
import { getHorseList } from './../../../../Redux/horse/actions';
import _Horse from './_Horse';
import { connect } from "react-redux";



class _HorseList extends Component{
    _isMounted = false
    constructor(props) {
        super(props)
        this.state = {
            DataHorses: [],
            loading: true,
        }
    }


    
    
     componentWillMount() {
        this._isMounted = true;
        this.props.getHorseList()
    }

     componentWillUnmount() {
        this._isMounted = false;
    }
    

    render() {

        if (!this.props.loading) {
            return <FlatList
                data={this.props.HorseList}
                renderItem={({item,index})=> <_Horse navigation={this.props.navigation}  horse={item}  index={index}/>}
                keyExtractor={item => item.id.toString()}
                />
        } else {
            return <ActivityIndicator style={{margin:'auto'}}/>
        }

    }
}


const mapStateToProps = ({ auth, locale, horse }) => {
    const { connected, idUser } = auth;
    const { HorseList, loading } = horse;
    const { Locale } = locale;
  
    return { connected, idUser, Locale, HorseList, loading };
  };
  
  
  export default connect(mapStateToProps,{getHorseList})(_HorseList);
  
  

