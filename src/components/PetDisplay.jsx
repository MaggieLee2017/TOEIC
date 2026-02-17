import PixelCat from './PixelCat'

function PetDisplay({ pet, onFeed, onClean, inventory, onUseItem }) {
    if (!pet) return null

    const status = pet.getStatus()
    const stage = pet.getGrowthStage()
    const isCat = pet.type === 'cat'

    const foodItems = inventory.filter(item => item.type === 'food' || item.type === 'treat')
    const toyItems = inventory.filter(item => item.type === 'toy')

    return (
        <div className="pet-display">
            <div
                className="pet-emoji-container"
                style={{
                    fontSize: isCat ? 'unset' : `${stage.sizeMultiplier * 4}rem`,
                    width: isCat ? `${stage.sizeMultiplier * 120}px` : 'auto',
                    height: isCat ? `${stage.sizeMultiplier * 120}px` : 'auto',
                    margin: '0 auto',
                    display: isCat ? 'flex' : 'block',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div className="pet-emoji" style={isCat ? { width: '100%', height: '100%' } : {}}>
                    {isCat ? <PixelCat action="idle" /> : pet.getEmoji()}
                </div>
                <div className="pet-status-emoji">{status.emoji}</div>
            </div>

            <h3 className="pet-name">{pet.name}</h3>
            <p className="pet-stage">{stage.name} • {pet.age} 天</p>
            <p className="pet-status-text" style={{ color: status.color }}>
                {status.text}
            </p>

            <div className="pet-stats">
                <div className="stat-bar">
                    <label>🍖 飽食度</label>
                    <div className="bar">
                        <div
                            className="bar-fill"
                            style={{
                                width: `${pet.hunger}%`,
                                background: pet.hunger < 30 ? '#dc2626' : '#10b981'
                            }}
                        />
                    </div>
                    <span>{Math.round(pet.hunger)}/100</span>
                </div>

                <div className="stat-bar">
                    <label>✨ 清潔度</label>
                    <div className="bar">
                        <div
                            className="bar-fill"
                            style={{
                                width: `${100 - pet.waste}%`,
                                background: pet.waste > 70 ? '#f59e0b' : '#3b82f6'
                            }}
                        />
                    </div>
                    <span>{Math.round(100 - pet.waste)}/100</span>
                </div>

                <div className="stat-bar">
                    <label>😊 快樂度</label>
                    <div className="bar">
                        <div
                            className="bar-fill"
                            style={{
                                width: `${pet.happiness}%`,
                                background: pet.happiness < 30 ? '#6b7280' : '#fbbf24'
                            }}
                        />
                    </div>
                    <span>{Math.round(pet.happiness)}/100</span>
                </div>
            </div>

            <div className="pet-actions">
                <button className="btn btn-success" onClick={onClean}>
                    🧹 清理
                </button>

                {foodItems.length > 0 && (
                    <div className="item-selector">
                        <label>餵食：</label>
                        <select
                            className="item-select"
                            onChange={(e) => {
                                if (e.target.value) {
                                    const item = foodItems.find(i => i.id === e.target.value)
                                    onFeed(item)
                                    e.target.value = ''
                                }
                            }}
                        >
                            <option value="">選擇食物</option>
                            {foodItems.map((item, idx) => (
                                <option key={`${item.id}-${idx}`} value={item.id}>
                                    {item.emoji} {item.name} (+{item.hunger_recovery})
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {toyItems.length > 0 && (
                    <div className="item-selector">
                        <label>玩具：</label>
                        <select
                            className="item-select"
                            onChange={(e) => {
                                if (e.target.value) {
                                    const item = toyItems.find(i => i.id === e.target.value)
                                    onUseItem(item)
                                    e.target.value = ''
                                }
                            }}
                        >
                            <option value="">選擇玩具</option>
                            {toyItems.map((item, idx) => (
                                <option key={`${item.id}-${idx}`} value={item.id}>
                                    {item.emoji} {item.name} (+{item.happiness_boost} 快樂)
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PetDisplay
