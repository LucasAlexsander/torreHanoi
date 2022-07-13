const alerta = document.querySelector('.alert');
const contactor = document.querySelector('#contador');
const hanoi = document.querySelector('#hanoi');
const timeDOM = document.querySelector('#timeSpend');
const tower = document.querySelector('.tower');
let towers = [[5,4,3,2,1],[],[]];
let towersSize = 5;
let positions = ['p1', 'p2', 'p3', 'p4', 'p5', 'p0', 't1', 't2', 't3'];
let movements = [];
let count = -1;
let diskSize = 5;
let time = 1; // Em segundos
let timeInSeg = null;

const getDiskSize = () => {
    diskSize = document.querySelector('#diskSize');
}

const createDisk = () => {    
    if(timeInSeg != null) {
        clearInterval(timeInSeg);
        timeInSeg = null;
        time = 1;
    }
    count = 0
    contactor.innerHTML = count
    diskSize = document.querySelector('#diskSize').value;
    let validation = document.querySelectorAll('.disk');
    towersSize = towers[0].length - (towers[0].length - diskSize);
    // console.log('Antes: ' + towers[0]);

    for(let i = 0; i < 3; i++) {
        // Removendo dos os elementos da torre
        while (towers[i].length != 0) towers[i].shift()
    }
    // Adicionando os elementos com base no tamanho da torre
    for(let i = 0; i < towersSize; i++) towers[0].unshift(i+1)
    // Removendo todos os discos
    for(let i = 0; i < validation.length; i++) {
        hanoi.removeChild(validation[i]);
    }
    // Inserindo todos os discos
    for(let i=1; i <= diskSize; i++) {
        let disk = document.createElement('div');
        let descrement = (diskSize - i) + 1;
        disk.classList.add('disk');
        disk.classList.add('d'+i);
        disk.classList.add('t1');
        disk.classList.add('p'+descrement);
        hanoi.insertBefore(disk, tower);
    }
    document.querySelector('#diskMoviments').innerHTML = (2**diskSize - 1);
}

const render = () => {    
    count++;
    // console.log(count);
    towers.forEach((tower, towerId) => {
        contactor.innerHTML = count;
        tower.forEach((disk, position) => {
            let d = document.querySelector('.d' + disk);
            positions.forEach(position => {
                d.classList.remove(position);               
            })
            d.classList.add('t'+ (towerId + 1))
            d.classList.add('p'+ (position + 1))
        });
    });
    if(towers[2].length == towersSize) {
        clearInterval(timeInSeg);
        timeInSeg = null;
        time = 1;
        setTimeout(() => {
            alerta.style.visibility = 'visible';    
            alerta.style.opacity = '1';    
        }, 1000);
    }
}

const move = (fromtower, totower) => {
    // Adicionando o tempo em segundos no DOM
    const timeFunction = () => { timeDOM.innerHTML = time++ }
    if(!timeInSeg) timeInSeg = setInterval( timeFunction, 1000);

    if(!towers[fromtower].length) return
    let disk = towers[fromtower].pop()
    let d = document.querySelector('.d' + disk)
    if(towers[totower].length) {
        if(towers[totower][towers[totower].length - 1] < disk) {
            // Pegamos a torre que deu o erro
            let towerError = d.classList[2];
            let towerDOMClass = document.querySelector('.error'+towerError).classList
            // Adicionamos a classe para piscar vermelho
            towerDOMClass.add('movementError')
            // Removemos a ação de piscar vermelho
            setTimeout(() => {
                towerDOMClass.remove('movementError')
            }, 730);

            return towers[fromtower].push(disk)
        }
    }
    d.classList.add('p0')
    towers[totower].push(disk)
    setTimeout(render, 400)
}

const clickTower = (n) => {
    if(movements.length && movements[0].length == 1) {
        movements[0].push(n)
    } else {
        movements.unshift([n])
    }
}

setInterval(() => {
    if(movements.length && movements[movements.length-1].length == 2) {
        let m=movements.pop()
        move(m[0], m[1])
    }
}, 600);

const solve = (size, fromtower, totower) => {
    if(size == 1) {
        return movements.unshift([fromtower, totower])
    }
    let other = 3 - fromtower-totower;
    solve(size-1, fromtower, other)
    movements.unshift([fromtower, totower]) 
    solve(size-1, other, totower)
}

const solveButton = () => {
    setTimeout(() => {
        solve(diskSize, 0, 2)
    }, 500);
}

render()

const closeAlert = () => {
    alerta.style.visibility = 'hidden'; 
    alerta.style.opacity = '0'
}

const resetButton = (e) => {
    if(e){
        alerta.style.visibility = 'hidden'; 
        alerta.style.opacity = '0';
    }

    // Resetando o time
    clearInterval(timeInSeg);
    timeInSeg = null;
    time = 1;
    createDisk()
}

// Botão do header
const buttonHeader = document.querySelector('.menuButton');
const extraArea = document.querySelector('nav');
let menuOpen = false
buttonHeader.addEventListener('click', () => {
    if(!menuOpen) {
        buttonHeader.classList.add('open');
        extraArea.classList.add('open')
        menuOpen = true;
    } else {
        buttonHeader.classList.remove('open');
        extraArea.classList.remove('open');
        menuOpen = false;
    }
})


// const handleClickMenu = () => {
//     let verificando = buttonHeader.className;
//     let spans = document.querySelectorAll('.menu');

//     if(verificando.indexOf('active') == -1) {
//         buttonHeader.classList.add('active')
//         spans.forEach(span => {
//             span.classList.add('active');
//         });
//     } else {
//         spans.forEach(span => {
//             buttonHeader.classList.remove('active')
//             span.classList.remove('active');
//         });
//     }

// }



