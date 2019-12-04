import ReactGA from 'react-ga';

const reactGA = jest.genMockFromModule<typeof ReactGA>('react-ga');

reactGA.initialize = jest.fn();

reactGA.pageview = jest.fn();

// noinspection JSUnusedGlobalSymbols
export default reactGA;