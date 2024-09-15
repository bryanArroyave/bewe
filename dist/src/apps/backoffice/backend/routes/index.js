import glob from 'glob';
export function registerRoutes(router) {
    const routes = glob.sync(`${__dirname}/**/*.route.*`);
    routes.map(route => register(route, router));
}
function register(routePath, router) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const { register } = require(routePath);
    register(router);
}
