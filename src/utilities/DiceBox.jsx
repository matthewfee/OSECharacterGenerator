import DiceBox from '@3d-dice/dice-box'

/*  --------------- DICE BOX -------------- */
// Note the dice-box assets in the public folder.
// Those files are all necessary for the web workers to function properly
// create new DiceBox class
const Dice = new DiceBox(
  '#dice-box', // target DOM element to inject the canvas for rendering
  {
    id: 'dice-canvas', // canvas element id
    theme: 'purpleRock', // this can be a hex color if you like
    assetPath: '/assets/dice-box/',
    gravity: 2,
    scale: 4

  }
)

export { Dice }
