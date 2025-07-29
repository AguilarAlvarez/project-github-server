function fillMaze(size) {
    const maze = Array(size)
        .fill(null)
        .map(() => Array(size).fill('W'));

    return maze;
}
export function generateMaze(size) {
    const maze = fillMaze(size);
    const start = Math.floor(Math.random() * size - 2)
    const position = { x: start + 1, y: size - 1 }
    maze[position.y][position.x] = 'S'
    position.y = position.y - 1
    maze[position.y][position.x] = 'P'
    //generate rigth path
    let itsend = false
    while (!itsend) {
        const move = createPath(maze, position)

        itsend = move.itsEnd
        position.x = move.position.x
        position.y = move.position.y
        if (itsend) {

            maze[position.y][position.x] = 'E'
        } else {


            maze[position.y][position.x] = 'P'
        }
    }
    return maze

}
function createPath(maze, position) {
    const listPosibleMoves = []
    showMaze(maze)
    console.log("--------------------------------")
    try {

        if (maze[position.y][position.x + 1] === "W" &&
            maze[position.y - 1][position.x + 1] === "W" &&
            maze[position.y + 1][position.x + 1] === "W" &&

            position.x + 1 !== maze.length - 1) {
            listPosibleMoves.push({ x: position.x + 1, y: position.y })
        }
    } catch (error) {

    }
    try {

        if (maze[position.y][position.x - 1] === "W" &&
            maze[position.y + 1][position.x - 1] === "W" &&
            maze[position.y - 1][position.x - 1] === "W" &&

            position.x - 1 !== 0) {
            listPosibleMoves.push({ x: position.x - 1, y: position.y })
        }
    } catch (error) {

    }
    try {

        if (maze[position.y + 1][position.x] === "W" &&
            maze[position.y + 1][position.x + 1] === "W" &&
            maze[position.y + 1][position.x - 1] === "W" &&

            position.y + 1 !== maze.length - 1) {
            listPosibleMoves.push({ x: position.x, y: position.y + 1 })
        }
    } catch (error) {

    }
    try {
        if (position.y - 1 === 0) {

            return {
                position: { x: position.x, y: position.y - 1 },
                itsEnd: true
            }
        }
        if (maze[position.y - 1][position.x] === "W" &&
            maze[position.y - 1][position.x - 1] === "W" &&
            maze[position.y + 1][position.x + 1] === "W"

        ) {

            listPosibleMoves.push({ x: position.x, y: position.y - 1 })
        }
    } catch (error) {

    }
    const move = Math.floor(Math.random() * listPosibleMoves.length)
    if (listPosibleMoves.length === 0) {
        listPosibleMoves.push({ x: position.x, y: position.y - 1 })
    }


    return {
        position: listPosibleMoves[move],
        itsEnd: false
    }

}

generateMaze(5)
function showMaze(maze) {
    var line;
    for (let i = 0; i < maze.length; i++) {
        line = ''
        for (let j = 0; j < maze.length; j++) {

            line += maze[i][j] + "  ";

        }
        console.log(line);
    }
}