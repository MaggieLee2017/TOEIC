// Pet Types
export const PET_TYPES = {
    CAT: { id: 'cat', name: '貓咪', emoji: '🐱' },
    DOG: { id: 'dog', name: '小狗', emoji: '🐶' }
}

// Growth Stages
export const GROWTH_STAGES = {
    BABY: { id: 'baby', name: '幼年', minAge: 0, maxAge: 7, sizeMultiplier: 0.7 },
    YOUNG: { id: 'young', name: '青年', minAge: 8, maxAge: 20, sizeMultiplier: 1.0 },
    ADULT: { id: 'adult', name: '成年', minAge: 21, maxAge: 999, sizeMultiplier: 1.2 }
}

// Pet Class
export class Pet {
    constructor(type, name) {
        this.type = type // 'cat' or 'dog'
        this.name = name
        this.age = 0 // 天數
        this.hunger = 100 // 0-100
        this.waste = 0 // 0-100
        this.happiness = 100 // 0-100
        this.createdAt = new Date().toISOString()
        this.lastUpdateAt = new Date().toISOString()
    }

    // 更新狀態（基於時間流逝）
    update() {
        const now = new Date()
        const lastUpdate = new Date(this.lastUpdateAt)
        const hoursPassed = (now - lastUpdate) / (1000 * 60 * 60)

        // 每小時減少飢餓值 5
        this.hunger = Math.max(0, this.hunger - hoursPassed * 5)

        // 每小時增加排泄值 3
        this.waste = Math.min(100, this.waste + hoursPassed * 3)

        // 飢餓或排泄過高會降低快樂度
        if (this.hunger < 30 || this.waste > 70) {
            this.happiness = Math.max(0, this.happiness - hoursPassed * 2)
        }

        this.lastUpdateAt = now.toISOString()
    }

    feed(foodItem) {
        this.hunger = Math.min(100, this.hunger + foodItem.hunger_recovery)
        if (foodItem.happiness_boost) {
            this.happiness = Math.min(100, this.happiness + foodItem.happiness_boost)
        }
    }

    clean() {
        this.waste = 0
        this.happiness = Math.min(100, this.happiness + 10)
    }

    incrementAge() {
        this.age += 1
    }

    getGrowthStage() {
        for (const stage of Object.values(GROWTH_STAGES)) {
            if (this.age >= stage.minAge && this.age <= stage.maxAge) {
                return stage
            }
        }
        return GROWTH_STAGES.ADULT
    }

    getEmoji() {
        const stage = this.getGrowthStage()

        if (this.type === 'cat') {
            if (stage.id === 'baby') return '🐱'
            if (stage.id === 'young') return '😺'
            return '😻'
        } else {
            if (stage.id === 'baby') return '🐶'
            if (stage.id === 'young') return '🐕'
            return '🦮'
        }
    }

    getStatus() {
        if (this.hunger < 20) return { text: '非常餓！', color: '#dc2626', emoji: '😿' }
        if (this.waste > 80) return { text: '需要清理！', color: '#f59e0b', emoji: '💩' }
        if (this.happiness < 30) return { text: '不開心', color: '#6b7280', emoji: '😢' }
        if (this.happiness > 80 && this.hunger > 70) return { text: '很快樂！', color: '#10b981', emoji: '😊' }
        return { text: '狀態良好', color: '#3b82f6', emoji: '🙂' }
    }
}

// Helper function to restore Pet from localStorage
export function restorePet(petData) {
    if (!petData) return null
    const pet = new Pet(petData.type, petData.name)
    Object.assign(pet, petData)
    return pet
}
