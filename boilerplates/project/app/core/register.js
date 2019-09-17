const routeModules = require.context('../routes', true, /\$register\.jsx?$/);
const registeredRouteModules = routeModules.keys().map(routeModules).map(v => v.default);

export const reducer = Object.assign({}, 
    ...registeredRouteModules.map(v => v.reducers)
)
export const saga = [
    ...registeredRouteModules.map(v => v.saga),
];

export const routes = registeredRouteModules.map(v => ({
    path: v.path,
    title: v.title,
    component: v.container,
}));