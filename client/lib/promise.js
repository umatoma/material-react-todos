import Promise from 'bluebird';

// use cancellation
Promise.config({ cancellation: true });

export default Promise;
