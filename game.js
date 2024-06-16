let towers = [[], [], []];
let selectedTower = null;

function startGame(numDisks) {
    towers = [[], [], []];
    for (let i = numDisks; i > 0; i--) {
        towers[0].push(i);
    }
    renderTowers();
}

function renderTowers() {
    for (let i = 0; i < 3; i++) {
        const tower = document.getElementById(`tower${i + 1}`);
        tower.innerHTML = '';
        towers[i].forEach(disk => {
            const diskElement = document.createElement('div');
            diskElement.className = 'disk';
            diskElement.dataset.size = disk;
            tower.appendChild(diskElement);
        });
    }
}

function selectTower(towerIndex) {
    if (selectedTower === null) {
        selectedTower = towerIndex;
    } else {
        moveDisk(selectedTower, towerIndex);
        selectedTower = null;
    }
}

function moveDisk(from, to) {
    if (from === to) return;
    const fromTower = towers[from - 1];
    const toTower = towers[to - 1];
    if (fromTower.length === 0) return;
    const disk = fromTower[fromTower.length - 1];
    if (toTower.length === 0 || disk < toTower[toTower.length - 1]) {
        toTower.push(fromTower.pop());
        renderTowers();
        checkWin();
    }
}

function checkWin() {
    if (towers[1].length === towers[0].length || towers[2].length === towers[0].length) {
        alert('Parabéns, você venceu!');
        startGame(towers[0].length);
    }
}

// Iniciar o jogo com o nível fácil por padrão
startGame(3);
