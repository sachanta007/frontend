import React from 'react';
import PaypalButton from './PaypalButton.jsx';

const CLIENT = {
  sandbox: 'AZaFh2TLPyetKcYFD8hLvdIPUCg09rOERE5S3Ff24jXLZKpNaTRNH8RIsGeEaHqaO6qV7ynWNtFsSSiG',
  //production: 'xxxXXX',
};

//const ENV = process.env.NODE_ENV === 'production'
//  ? 'production'
//  : 'sandbox';

class Button extends React.Component {
  render() {
    const onSuccess = (payment) =>
      console.log('Successful payment!', payment);

    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);

    const onCancel = (data) =>
      console.log('Cancelled payment!', data);

    return (
      <div>
        <PaypalButton
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={'USD'}
          total={100}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
      </div>
    );
  }
}

export default Button;
