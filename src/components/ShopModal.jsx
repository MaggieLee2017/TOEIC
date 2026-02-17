function ShopModal({ shopItems, userCoins, onPurchase, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content shop-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>🛒 寵物商店</h2>
                    <div className="coin-display-modal">💰 {userCoins} 枚金幣</div>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                <div className="shop-grid">
                    {shopItems.map(item => (
                        <div key={item.id} className="shop-item">
                            <div className="shop-item-emoji">{item.emoji}</div>
                            <h4>{item.name}</h4>
                            <p className="shop-item-desc">{item.description}</p>
                            <div className="shop-item-effects">
                                {item.hunger_recovery && <span>🍖 +{item.hunger_recovery}</span>}
                                {item.happiness_boost && <span>😊 +{item.happiness_boost}</span>}
                            </div>
                            <div className="shop-item-price">💰 {item.price}</div>
                            <button
                                className="btn btn-primary shop-buy-btn"
                                onClick={() => onPurchase(item)}
                                disabled={userCoins < item.price}
                            >
                                {userCoins >= item.price ? '購買' : '金幣不足'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ShopModal
