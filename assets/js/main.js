// Variáveis usadas para selecionar os elementos da DOM
const alerta = document.querySelector('.alert');
const contactor = document.querySelector('#contador');
const hanoi = document.querySelector('#hanoi');
const timeDOM = document.querySelector('#timeSpend');
const tower = document.querySelector('.tower');
// Array contendo as torres e dentro o número dos discos
let towers = [[5,4,3,2,1],[],[]];
let towersSize = 5;
// Array com todas as posições e torres
let positions = ['p1', 'p2', 'p3', 'p4', 'p5', 'p0', 't1', 't2', 't3'];
// Buffer de movimento
let movements = [];
// Variavel para contar o tempo
let count = -1;
// Variável com o tamanho do disco
let diskSize = 5;
// Variáveis de tempo
let time = 1; // Em segundos
let timeInSeg = null;

// Função que vai pegar no DOM o número de discos que o usuário deseja
const getDiskSize = () => {
    diskSize = document.querySelector('#diskSize');
}

// Função usada para criar discos
const createDisk = () => {    

    // Condição para resetar o contador de tempo
    if(timeInSeg != null) {
        clearInterval(timeInSeg);
        timeInSeg = null;
        time = 1;
    }
    count = 0
    contactor.innerHTML = count

    // Pegando o número de discos passados pelo usuário
    diskSize = document.querySelector('#diskSize').value;
    let validation = document.querySelectorAll('.disk');
    // Definindo o novo tamanho da torre
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
    // Inserindo no DOM o número necessário de movimentos para resolver o puzzle
    document.querySelector('#diskMoviments').innerHTML = (2**diskSize - 1);
}

const render = () => {    
    count++;
    // Entramos no array geral da torre
    // Por conta do forEach conseguimos mexer em cada array separadamente
    towers.forEach((tower, towerId) => {
        contactor.innerHTML = count;
        // Entramos dentro do array da torre assim pegando os discos
        tower.forEach((disk, position) => {
            let d = document.querySelector('.d' + disk);
            // Removemos todas as posições
            positions.forEach(position => {
                d.classList.remove(position);               
            })
            // Adicionamos as posições junto com o número da torre
            d.classList.add('t'+ (towerId + 1))
            d.classList.add('p'+ (position + 1))
        });
    });
    // Condição caso a última torre fique com todos os discos
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
    // Pegamos o último disco da torre que selecionamoss
    let disk = towers[fromtower].pop()
    let d = document.querySelector('.d' + disk)
    // Codição para ver o destino do disco
    if(towers[totower].length) {
        // Tratando o problema se o disco inserido for maior que o da torre
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
            // Volta com o disco para a torre original
            return towers[fromtower].push(disk)
        }
    }
    d.classList.add('p0')
    // Inserimoos o disco na torre
    towers[totower].push(disk)
    // Função para rodar o render em 400ms
    setTimeout(render, 400)
}

// Função para capiturar o clique na torre (movimento) e jogar no buffer
const clickTower = (n) => {
    if(movements.length && movements[0].length == 1) {
        movements[0].push(n)
    } else {
        movements.unshift([n])
    }
}

// Função que vai limpar o buffer de movimentos a cada 600ms
setInterval(() => {
    if(movements.length && movements[movements.length-1].length == 2) {
        let m=movements.pop()
        move(m[0], m[1])
    }
}, 600);

// Função de recursividade para resolver a torre
const solve = (size, fromtower, totower) => {
    // Se o tamanho for igual a 1 joga o disco pro final
    if(size == 1) {
        return movements.unshift([fromtower, totower])
    }
    // Calculando a outra torre (auxiliar)
    let other = 3 - fromtower-totower;
    // Vai mover todos os discos menos 1 para a torre auxiliar
    solve(size-1, fromtower, other)
    // Movemos o disco que sobrou pra torre de destino
    movements.unshift([fromtower, totower]) 
    // Vai mover todos os discos que estavam na torre auxiliar para a de destino
    solve(size-1, other, totower)
}

// Função para rodar a resolução do problema
const solveButton = () => {
    setTimeout(() => {
        solve(diskSize, 0, 2)
    }, 500);
}

render()
// Fechar a mensagem de alerta
const closeAlert = () => {
    alerta.style.visibility = 'hidden'; 
    alerta.style.opacity = '0'
}
// Função para resetar o jogo
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



