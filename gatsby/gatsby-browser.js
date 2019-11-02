import PageElementWrapper from './src/components/wrappers/PageElementWrapper';
import RootElementWrapper from './src/components/wrappers/RootElementWrapper';
import './src/styles/global.scss';

const onRouteUpdate = () => {
	console.log('route changed');
};

export { onRouteUpdate, RootElementWrapper as wrapRootElement, PageElementWrapper as wrapPageElement };
