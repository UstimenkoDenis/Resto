import React, {Component} from 'react';
import Error from '../error';

// Граница ошибок - срабатывает только тогда когда ниже в иерархии роизошла критическая ошибка
export default class ErrorBoundry extends Component {

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({error: true})
    }
    render() {
       
        if(this.state.error) {
            return <Error/>
        }

        return this.props.children; // если все нормально то отрендерим все что внутри компонента ErrorBoundry
    }
}