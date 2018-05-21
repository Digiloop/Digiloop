// This file is used by react-app-rewired (https://github.com/timarney/react-app-rewired)
// It is a hacky solution to reconfiguring webpack configurations
// Without this, we'd need to eject create-react-script's config build
// If things break, it's most likely due to webpack updates

// To revert this, change the run, build & test in package.json to "react-scripts"
// for example: "start": "react-app-rewired start" -> "react-scripts start" 

// CURRENTLY NOT IN USE - React has said (2016) that it does not support source maps
// https://github.com/bem/bem-react-boilerplate/issues/1
module.exports = function override(config, env) {
    config.module.push({devtool: 'cheap-eval-source-map'});
    return config;
}
