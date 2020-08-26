import React, { Suspense } from 'react'
import { Provider } from 'react-redux';
import { Root } from "native-base";
import { configureStore } from './Redux/store';
import Conector from './Conector';



export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Root>
        <Provider store={configureStore()}>
          <Suspense>
            <Conector/>
          </Suspense>
        </Provider>
      </Root>
    )
  }
}
