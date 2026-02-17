import { useState, useEffect } from 'react'

// Pixel Art Guidelines (16x16 grid)
// Colors: O=Orange(#f59e0b), W=White(#fff), B=Black(#000), T=Transparent, P=Pink(#f472b6)
const COLORS = {
    O: '#f59e0b', // Fur
    W: '#ffffff', // Belly/Paws
    B: '#1f2937', // Eyes
    P: '#f472b6', // Ears/Nose
    X: 'transparent'
}

const PIXEL_MAPS = {
    idle: [
        "XXXXX.....XXXXXX",
        "XXXX.O.X.O.XXXXX",
        "XXXX.OOOOO.XXXXX",
        "XXXX.OBOBO.XXXXX",
        "XXXX.OOOOO.XXXXX",
        "XXXX.O.P.O.XXXXX",
        "XXXX.OOOOO.XXXXX",
        "XXXX.OOOOO.XXXXX",
        "XX...OOOOO...XXX",
        "XX.OOOOOOOOO.XXX",
        "XX.OOOOOOOOO.XXX",
        "XX.OOOOOOOOO.XXX",
        "XX.OWOOOOOWO.XXX",
        "XX.OWXXXXXWO.XXX",
        "XXXXX.....XXXXXX",
        "XXXXXXXXXXXXXXXX"
    ],
    walk1: [
        "XXXXX.....XXXXXX",
        "XXXX.O.X.O.XXXXX",
        "XXXX.OOOOO.XXXXX",
        "XXXX.OBOBO.XXXXX",
        "XXXX.OOOOO.XXXXX",
        "XXXX.O.P.O.XXXXX",
        "XXXX.OOOOO.XXXXX",
        "XX...OOOOO...XXX",
        "XX.OOOOOOOOO.XXX",
        "XX.OOOOOOOOO.XXX",
        "XX.OOOOOOOOO.XXX",
        "XX.OWOOOOOWO.XXX",
        "XX.OWXXXXXWO.XXX",
        "XX.........XXXXX",
        "XXXXXXXXXXXXXXXX",
        "XXXXXXXXXXXXXXXX"
    ],
    walk2: [
        "XXXXX.....XXXXXX",
        "XXXX.O.X.O.XXXXX",
        "XXXX.OOOOO.XXXXX",
        "XXXX.OBOBO.XXXXX",
        "XXXX.OOOOO.XXXXX",
        "XXXX.O.P.O.XXXXX",
        "XXXX.OOOOO.XXXXX",
        "XX...OOOOO...XXX",
        "XX.OOOOOOOOO.XXX",
        "XX.OOOOOOOOO.XXX",
        "XX.OOOOOOOOO.XXX",
        "XX.OOOOOOOOO.XXX",
        "XX.XWOOOOWX.XXX",
        "XX.XWXXXXWX.XXX",
        "XXXXXXXXXXXXXXXX",
        "XXXXXXXXXXXXXXXX"
    ],
    sleep: [
        "XXXXXXXXXXXXXXXX",
        "XXXXXXXXXXXXXXXX",
        "XXXXXXXXXXXXXXXX",
        "XXXX.........XXX",
        "XXXX.OOOOOOO.XXX",
        "XXXX.OOOOOOO.XXX",
        "XXXX.O--O--O.XXX", // - represents closed eyes
        "XXXX.OOOPOOO.XXX",
        "XXXX.OOOOOOO.XXX",
        "XXX.OOOOOOOOO.XX",
        "XXX.OOOOOOOOO.XX",
        "XXX.OOOOOOOOO.XX",
        "XXX.WWWWWWWWW.XX",
        "XXXXXXXXXXXXXXXX",
        "XXXXXXXXXXXXXXXX",
        "XXXXXXXXXXXXXXXX"
    ]
}

function PixelCat({ action = 'idle' }) {
    const [frame, setFrame] = useState(0)

    useEffect(() => {
        if (action === 'walking') {
            const interval = setInterval(() => {
                setFrame(f => (f + 1) % 2)
            }, 200)
            return () => clearInterval(interval)
        } else {
            setFrame(0)
        }
    }, [action])

    let mapKey = 'idle'
    if (action === 'walking') mapKey = frame === 0 ? 'walk1' : 'walk2'
    if (action === 'resting' || action === 'sleeping') mapKey = 'sleep'

    const pixelMap = PIXEL_MAPS[mapKey]

    const rects = []
    pixelMap.forEach((row, y) => {
        for (let x = 0; x < row.length; x++) {
            const char = row[x]
            let fill = COLORS.X
            if (char === 'O') fill = COLORS.O
            else if (char === 'W') fill = COLORS.W
            else if (char === 'B') fill = COLORS.B
            else if (char === 'P') fill = COLORS.P
            else if (char === '-') fill = COLORS.O
            else if (char === '.') fill = 'transparent'

            // Correction for closed eyes in sleep mode
            if (mapKey === 'sleep' && char === '-') {
                fill = '#d97706'
            }

            if (fill !== 'transparent' && fill !== COLORS.X) {
                rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={fill} />)
            }
        }
    })

    return (
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges" style={{ width: '100%', height: '100%' }}>
            {rects}
        </svg>
    )
}

export default PixelCat
