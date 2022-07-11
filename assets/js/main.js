let towers = [[5,4,3,2,1],[],[]];
let positions = ['p1', 'p2', 'p3', 'p4', 'p5', 'p0', 't1', 't2', 't3'];
let movements = [];
let count = 0;
let contactor = document.querySelector('#contador')

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
    console.log(count - 1);
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
    console.log(d);
    towers[totower].push(disk)
    setTimeout(render, 400)
}

const clickTower = (n) => {
    if(movements.length && movements[0].length == 1) {
        movements[0].push(n)
    } else {
        movements.unshift([n])
    }
    console.log(movements);
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
        solve(5, 0, 2)
    }, 500);
}


render()
