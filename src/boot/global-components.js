import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import { boot } from "quasar/wrappers";

export default boot(async ({ app }) => {
    // https://webpack.js.org/guides/dependency-management/#require-context
    const requireComponent = require.context(
        // Look for files in the current directory
        "src/components/commons",
        // Look in subdirectories
        true,
        // Match .vue viles
        /[\w-]+\.vue$/
    );

    // For each matching file name...
    requireComponent.keys().forEach((fileName) => {
        // Get the component config
        const componentConfig = requireComponent(fileName);

        // Get PascalCase name of component
        const componentName = upperFirst(
            camelCase(
                // Gets the file name regardless of folder depth
                fileName
                    .split("/")
                    .pop()
                    .replace(/\.\w+$/, "") // remove file extension
            )
        );

        // Globally register the component
        app.component(
            `${componentName}`,
            componentConfig.default || componentConfig
        );
    });
});
