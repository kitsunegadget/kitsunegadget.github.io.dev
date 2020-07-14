let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D | null
const height = 300

export default function WaveInit(id: string) {
  canvas = document.getElementById(id) as HTMLCanvasElement
  ctx = canvas.getContext('2d')

  DrawWave(0)
}

function DrawWave(t: number) {
  if(ctx) {
    const width = window.innerWidth
    ctx.canvas.width = width
    ctx.canvas.height = height

    ctx.beginPath()
    ctx.fillStyle = 'rgba(255,255,255,0.25)'
    const t0 = t / 3000
    let i = 0
    while(i <= width) {
        const h = (Math.sin(2*t0 + i/180) + Math.sin(t0 + i/150)) * height / 8
        ctx.lineTo(i, h + height / 2)
        ++i
    }
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.fill()

    window.requestAnimationFrame(DrawWave)
  }
}
