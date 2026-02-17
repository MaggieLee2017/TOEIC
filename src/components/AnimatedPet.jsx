import { useState, useEffect } from 'react'
import PixelCat from './PixelCat'

function AnimatedPet({ pet }) {
    const [position, setPosition] = useState({ x: 30, y: 0 })
    const [direction, setDirection] = useState('right')
    const [activity, setActivity] = useState('walking')

    useEffect(() => {
        if (!pet) return
        const interval = setInterval(() => {
            setActivity(Math.random() < 0.3 ? 'resting' : 'walking')
        }, 5000)
        return () => clearInterval(interval)
    }, [pet])

    useEffect(() => {
        if (!pet || activity === 'resting') return
        const interval = setInterval(() => {
            setPosition(prev => {
                let newX = prev.x
                let newDir = direction
                if (direction === 'right') {
                    newX += 1.5
                    if (newX > 80) { newDir = 'left'; newX = 80 }
                } else {
                    newX -= 1.5
                    if (newX < 5) { newDir = 'right'; newX = 5 }
                }
                if (newDir !== direction) setDirection(newDir)
                return { ...prev, x: newX }
            })
        }, 120)
        return () => clearInterval(interval)
    }, [pet, activity, direction])

    if (!pet) return null

    return (
        <div
            className="animated-pet-container"
            style={{
                left: `${position.x}%`,
                transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'
            }}
        >
            <div className={`pixel-pet-wrapper ${activity}`}>
                <PixelCat action={activity} />
                {activity === 'resting' && <div className="zzz">💤</div>}
            </div>
        </div>
    )
}

export default AnimatedPet
