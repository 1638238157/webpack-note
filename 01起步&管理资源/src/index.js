import _ from "lodash";
import './style.css';
import Icon from './add_icon.png';
function component() {
    let element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    const myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    return element;
}
document.querySelector('body').appendChild(component());