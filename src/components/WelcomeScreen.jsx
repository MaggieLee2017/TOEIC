import { useState } from 'react'
import { PET_TYPES } from '../pet_system'

function WelcomeScreen({ onCreateUser }) {
    const [username, setUsername] = useState('')
    const [selectedPet, setSelectedPet] = useState('cat')

    const handleSubmit = () => {
        if (username.trim()) {
            onCreateUser(username.trim(), selectedPet)
        } else {
            alert('請輸入名稱')
        }
    }

    return (
        <div className="welcome-screen">
            <div className="welcome-container">
                <h1>🎓 歡迎來到 TOEIC 寵物學習 APP</h1>
                <p className="welcome-subtitle">學英文，養寵物，一起成長！</p>

                <div className="welcome-form">
                    <div className="form-group">
                        <label>你的名稱</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="請輸入你的名稱"
                            className="welcome-input"
                            maxLength={20}
                        />
                    </div>

                    <div className="form-group">
                        <label>選擇你的寵物夥伴</label>
                        <div className="pet-selection">
                            <div
                                className={`pet-option ${selectedPet === 'cat' ? 'selected' : ''}`}
                                onClick={() => setSelectedPet('cat')}
                            >
                                <div className="pet-emoji">🐱</div>
                                <div className="pet-name">貓咪</div>
                                <div className="pet-desc">溫柔可愛</div>
                            </div>
                            <div
                                className={`pet-option ${selectedPet === 'dog' ? 'selected' : ''}`}
                                onClick={() => setSelectedPet('dog')}
                            >
                                <div className="pet-emoji">🐶</div>
                                <div className="pet-name">小狗</div>
                                <div className="pet-desc">活潑忠誠</div>
                            </div>
                        </div>
                    </div>

                    <button
                        className="btn btn-primary welcome-btn"
                        onClick={handleSubmit}
                        disabled={!username.trim()}
                    >
                        開始養寵物學英文！🚀
                    </button>

                    <div className="welcome-info">
                        <p>💰 初始金幣：100 枚</p>
                        <p>📚 答對題目賺金幣，購買食物和玩具</p>
                        <p>🐾 好好照顧你的寵物，看它健康成長！</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeScreen
