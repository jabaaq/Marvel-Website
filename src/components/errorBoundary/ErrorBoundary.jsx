import {Component} from 'react/cjs/react.production.min';
import {ErrorMessage} from '../errorMessage/ErrorMessage';

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({error: true});
  }

  render() {
    if (this.state.error) {
      //if we have (this.state.error === true) then in this case we will render a spare interface
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary; //I will use this in App.jsx
