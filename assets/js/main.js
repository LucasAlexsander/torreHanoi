let disc1 = document.querySelector('#disc1');
let disc2 = document.querySelector('#disc2');
let disc3 = document.querySelector('#disc3');
let body = document.querySelector('body');
let mouseX = 0;
let mouseY = 0;
// console.log(disc1);

console.log( window.innerWidth);

function moveDisc (elem) {

    const handleMouse = (e) => {

        let height = window.innerHeight;
        let width = window.innerWidth;
        console.log(e.screenX);

        if(width >= 1359) {
            if(e.target.id === 'disc3') {
                console.log('disc3');
                elem.target.style.left = (e.screenX + 750) + 'px';
            } else if (e.target.id === 'disc2') {
                console.log('disc2');
                elem.target.style.left = (e.screenX + 750) + 'px';
            } else {
                console.log('disc1');
                elem.target.style.left = (e.screenX + 750) + 'px';
            }  
        } 

        elem.target.style.top = e.screenY - 120 + 'px';
        elem.target.style.cursor = 'grabbing';
        elem.target.style.zIndex = 1;
    }

    body.addEventListener('mousemove', handleMouse);

    elem.target.addEventListener('mouseup', () => {
        console.log(body.removeEventListener('mousemove', handleMouse));
    })
}

const stopMoveDisc = (elem) => {
    body.removeEventListener('mousedown', moveDisc)
    elem.target.style.cursor = 'default';
}

disc1.addEventListener('mousedown', moveDisc);
disc2.addEventListener('mousedown', moveDisc);
disc3.addEventListener('mousedown', moveDisc);
