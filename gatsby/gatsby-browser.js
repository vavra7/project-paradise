import PageElementWrapper from './src/components/wrappers/PageElementWrapper';
import RootElementWrapper, { store } from './src/components/wrappers/RootElementWrapper';
import './src/styles/global.scss';

const onRouteUpdate = () => {
	const isMobile = store.getState().app.isMobile;
	const isSafari = store.getState().app.browser.mobile.isSafari;

	console.log(isMobile, isSafari, store.getState().app.width);
};

export { onRouteUpdate, RootElementWrapper as wrapRootElement, PageElementWrapper as wrapPageElement };
