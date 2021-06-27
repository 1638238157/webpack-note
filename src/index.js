import _ from "lodash";
function component() {
    let element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    element.appendChild(btn);

    return element;
}
document.querySelector('body').appendChild(component());