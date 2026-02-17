import { useState, useEffect } from 'react'

function TamagotchiDisplay({ pet, onFeed, onClean, onUseItem, inventory, onBack, onShop }) {
    if (!pet) return null

    const [animState, setAnimState] = useState('idle')
    const [lcdMsg, setLcdMsg] = useState('')

    useEffect(() => {
        if (!pet) return
        const interval = setInterval(() => {
            const r = Math.random()
            if (r < 0.4) setAnimState('walk')
            else if (r < 0.8) setAnimState('idle')
            else setAnimState('sleep')
        }, 4000)
        return () => clearInterval(interval)
    }, [pet])

    const showMsg = (msg) => {
        setLcdMsg(msg)
        setTimeout(() => setLcdMsg(''), 1500)
    }

    const handleFeed = (item) => {
        showMsg('好吃！😋')
        setAnimState('idle')
        onFeed(item)
    }

    const handleClean = () => {
        showMsg('乾淨！✨')
        onClean()
    }

    const foodItems = inventory.filter(i => i.type === 'food' || i.type === 'treat')
    const toyItems = inventory.filter(i => i.type === 'toy')

    return (
        <div className="tamagotchi-wrapper">
            {/* Tamagotchi Device */}
            <div className="tama-device">
                <div className="tama-device-top">
                    <div className="tama-brand">🐾 TOEIC PET</div>
                </div>

                <div className="tama-screen">
                    {/* Status bar */}
                    <div className="tama-status-row">
                        <span>🍖{Math.round(pet.hunger)}</span>
                        <span>✨{Math.round(100 - pet.waste)}</span>
                        <span>❤️{Math.round(pet.happiness)}</span>
                    </div>

                    {/* Cat display area */}
                    <div className="tama-cat-area">
                        <div className={`tama-cat ${animState}`}>
                            <div className="tc-body">
                                <div className="tc-ear tc-ear-l"></div>
                                <div className="tc-ear tc-ear-r"></div>
                                <div className="tc-head">
                                    <div className="tc-eyes">
                                        <div className={`tc-eye ${animState === 'sleep' ? 'closed' : ''}`}></div>
                                        <div className={`tc-eye ${animState === 'sleep' ? 'closed' : ''}`}></div>
                                    </div>
                                    <div className="tc-nose"></div>
                                    <div className="tc-mouth"></div>
                                </div>
                                <div className="tc-torso"></div>
                                <div className="tc-legs">
                                    <div className={`tc-leg ${animState === 'walk' ? 'moving' : ''}`}></div>
                                    <div className={`tc-leg ${animState === 'walk' ? 'moving' : ''}`} style={{ animationDelay: '0.15s' }}></div>
                                </div>
                                <div className={`tc-tail ${animState === 'sleep' ? '' : 'wagging'}`}></div>
                            </div>
                            {pet.waste > 50 && <div className="tc-poop">💩</div>}
                            {animState === 'sleep' && <div className="tc-zzz">💤</div>}
                        </div>

                        {lcdMsg && <div className="tama-msg">{lcdMsg}</div>}
                    </div>

                    {/* Bottom info */}
                    <div className="tama-info-row">
                        <span>{pet.name}</span>
                        <span>{pet.age} 天</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="tama-buttons">
                    <button className="tama-btn" onClick={() => {
                        const food = foodItems[0]
                        if (food) handleFeed(food)
                        else showMsg('沒有食物！')
                    }}>🍖</button>
                    <button className="tama-btn" onClick={handleClean}>🧹</button>
                    <button className="tama-btn" onClick={() => {
                        const toy = toyItems[0]
                        if (toy && onUseItem) { onUseItem(toy); showMsg('好開心！') }
                        else showMsg('沒有玩具！')
                    }}>⚽</button>
                </div>
                <div className="tama-btn-labels">
                    <span>餵食</span>
                    <span>清潔</span>
                    <span>玩耍</span>
                </div>
            </div>

            {/* Stats Panel */}
            <div className="pet-stats-panel">
                <h3>📊 寵物狀態</h3>
                <div className="stat-bar"><label>飽食度</label><div className="bar"><div className="bar-fill" style={{ width: `${pet.hunger}%`, background: pet.hunger < 30 ? '#ef4444' : '#10b981' }}></div></div><span>{Math.round(pet.hunger)}%</span></div>
                <div className="stat-bar"><label>清潔度</label><div className="bar"><div className="bar-fill" style={{ width: `${100 - pet.waste}%`, background: pet.waste > 70 ? '#ef4444' : '#3b82f6' }}></div></div><span>{Math.round(100 - pet.waste)}%</span></div>
                <div className="stat-bar"><label>快樂度</label><div className="bar"><div className="bar-fill" style={{ width: `${pet.happiness}%`, background: pet.happiness < 30 ? '#ef4444' : '#f59e0b' }}></div></div><span>{Math.round(pet.happiness)}%</span></div>
            </div>

            {/* Inventory */}
            {foodItems.length > 0 && (
                <div className="pet-inventory">
                    <h3>🎒 背包食物</h3>
                    <div className="inv-items">
                        {foodItems.map((item, i) => (
                            <button key={`${item.id}-${i}`} className="inv-btn" onClick={() => handleFeed(item)}>
                                {item.emoji} {item.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Action buttons */}
            <div className="action-buttons">
                <button className="btn btn-primary" onClick={onShop}>🛒 寵物商店</button>
                <button className="btn btn-primary" onClick={onBack}>🏠 返回首頁</button>
            </div>
        </div>
    )
}

export default TamagotchiDisplay
