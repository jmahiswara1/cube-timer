export function generateScramble(length: number = 20): string {
    const moves = ["U", "D", "L", "R", "F", "B"];
    const modifiers = ["", "'", "2"];
    let scramble = [];
    let lastMove = -1;
    let secondLastMove = -1;

    for (let i = 0; i < length; i++) {
        let moveIndex;

        // Pastikan move tidak sama dengan move sebelumnya
        // Dan tidak sama dengan dua move sebelumnya jika move sebelumnya berlawanan arah
        // (Misal: R L R tidak valid, karena R dan L pada axis yang sama lalu R lagi)
        do {
            moveIndex = Math.floor(Math.random() * moves.length);
        } while (
            moveIndex === lastMove ||
            (Math.floor(moveIndex / 2) === Math.floor(lastMove / 2) && moveIndex === secondLastMove) ||
            (Math.floor(moveIndex / 2) === Math.floor(lastMove / 2) && Math.floor(lastMove / 2) === Math.floor(secondLastMove / 2))
        );

        const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
        scramble.push(moves[moveIndex] + modifier);

        secondLastMove = lastMove;
        lastMove = moveIndex;
    }

    return scramble.join(" ");
}
