// import _ from "lodash";
// function component() {
//     let element = document.createElement('div');

//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//     element.appendChild(btn);

//     return element;
// }
// document.querySelector('body').appendChild(component());

// function getComponent(){
//     return import(/* webpackChunkName: "lodash" */'lodash').then(({default: _ }) => {
//         let element = document.createElement('div');
//         element.innerHTML = _.join(['Hello', 'webpack'], ' ')
//         return element;
//     }).catch(error => 'An error occurred while loading the component')
// }
// getComponent().then(component => {
//   document.body.appendChild(component);
// })

async function getComponent(){
    let element = document.createElement('div');
    const {default: _ } = await import(/* webpackChunkName: "lodash" */'lodash');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    return element;
}

getComponent().then(component => {
    document.body.appendChild(component);
})