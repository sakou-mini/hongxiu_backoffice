export const importPath = (path) => {
    return resolve => require([`@/views${path}`],resolve)
}
