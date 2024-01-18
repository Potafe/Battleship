import Player from '../factories/player'

let cpu
let combatant

describe('Player', () => {
    beforeEach(() => {
        combatant = Player('combatant')
        cpu = Player('cpu')
    })

    test('Player no of turns', () => {
        combatant.play(0, 0)

        expect(combatant.getTurn()).toEqual(1)   
    })

    test('each coordinate can be played only once', () => {
        combatant.play(0, 0)
        combatant.play(0, 0)

        expect(combatant.getTurn()).toBe(1)
      })

    test('CPU plays random but valid co-ordinate', () => { 
        cpu.play()
        cpu.play()

        expect(cpu.getTurn()).toBe(2)
    })
})