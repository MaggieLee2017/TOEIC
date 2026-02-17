import { useState } from 'react'
import PixelCat from './PixelCat'

function WelcomeScreen({ onCreateUser }) {
    const [username, setUsername] = useState('')

    const handleSubmit = () => {
        if (username.trim()) {
            // Default to 'cat' since it's the only option now
            onCreateUser(username.trim(), 'cat')
        } else {
            alert('請輸入名稱')
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }

    return (
        <div className="welcome-screen">
            <div className="welcome-wrapper">
                <header className="welcome-header">
                    <h1 className="welcome-title">
                        TOEIC <span className="highlight">Pet</span> Learning
                    </h1>
                    <p className="welcome-subtitle">學英文，養寵物，一起成長！</p>
                </header>

                <div className="welcome-content">
                    <div className="pet-showcase">
                        <div className="pet-stage-circle">
                            <div className="pet-actor">
                                {/* Use a slightly larger size for the showcase */}
                                <PixelCat action="idle" color="#ffffff" size={120} />
                            </div>
                        </div>
                        <p className="pet-intro">你的最佳學習夥伴：<span className="cat-name">像素貓貓</span></p>
                    </div>

                    <div className="welcome-form-container">
                        <div className="form-input-group">
                            <label htmlFor="username">你的名稱</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="請輸入你的名稱..."
                                className="styled-input"
                                maxLength={12}
                                autoFocus
                            />
                        </div>

                        <button
                            className="btn-start"
                            onClick={handleSubmit}
                            disabled={!username.trim()}
                        >
                            開始養寵物學英文！ 🚀
                        </button>
                    </div>

                    <div className="game-info-cards">
                        <div className="info-card">
                            <span className="info-icon">💰</span>
                            <span className="info-text">初始金幣：100 枚</span>
                        </div>
                        <div className="info-card">
                            <span className="info-icon">📚</span>
                            <span className="info-text">答題賺金幣</span>
                        </div>
                        <div className="info-card">
                            <span className="info-icon">🍖</span>
                            <span className="info-text">購買食物與玩具</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeScreen
