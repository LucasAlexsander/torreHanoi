let towers = [[5,4,3,2,1],[],[]];
let positions = ['p1', 'p2', 'p3', 'p4', 'p5', 'p0', 't1', 't2', 't3'];
let movements = [];
let count = 0;
let contactor = document.querySelector('#contador');
let diskSize = 5;
let hanoi = document.querySelector('#hanoi');
let tower = document.querySelector('.tower');
let towersSize = 5;
let alerta = document.querySelector('.alert')


const getDiskSize = () => {
    diskSize = document.querySelector('#diskSize');
}

const createDisk = () => {
    diskSize = document.querySelector('#diskSize').value;
    let validation = document.querySelectorAll('.disk');
    towersSize = towers[0].length - (towers[0].length - diskSize);
    console.log(towersSize);
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
}

const render = () => {
    towers.forEach((tower, towerId) => {
        tower.forEach((disk, position) => {
            let d = document.querySelector('.d' + disk);
            positions.forEach(position => {
                d.classList.remove(position);               
            })
            d.classList.add('t'+ (towerId + 1))
            d.classList.add('p'+ (position + 1))
        });
    });
    contactor.innerHTML = count ++;
    if(towers[2].length == towersSize) {
        setTimeout(() => {
            alerta.style.visibility = 'visible';    
            alerta.style.opacity = '1';    
        }, 1000);
    }
}


const move = (fromtower, totower) => {
    if(!towers[fromtower].length) return
    let disk = towers[fromtower].pop()
    let d = document.querySelector('.d' + disk)
    if(towers[totower].length) {
        if(towers[totower][towers[totower].length - 1] < disk) {
            // Class que vai picar vermelho
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
    console.log(movements.value);
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