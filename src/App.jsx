import { useState, useEffect } from 'react'
import { Pet, restorePet } from './pet_system'
import WelcomeScreen from './components/WelcomeScreen'
import PetDisplay from './components/PetDisplay'
import ShopModal from './components/ShopModal'
import AnimatedPet from './components/AnimatedPet'
import TamagotchiDisplay from './components/TamagotchiDisplay'

function App() {
    // Existing state
    const [data, setData] = useState(null)
    const [listeningData, setListeningData] = useState(null)
    const [grammarData, setGrammarData] = useState(null)
    const [readingData, setReadingData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [mode, setMode] = useState('home')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
    const [quizQuestions, setQuizQuestions] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showExplanation, setShowExplanation] = useState(false)
    const [score, setScore] = useState(0)
    const [wrongAnswers, setWrongAnswers] = useState([])
    const [currentVocabIndex, setCurrentVocabIndex] = useState(0)
    const [categoryVocabs, setCategoryVocabs] = useState([])
    const [currentPassageIndex, setCurrentPassageIndex] = useState(0)
    const [currentPassageQuestions, setCurrentPassageQuestions] = useState([])

    // New Phase 3 state
    const [user, setUser] = useState(null)
    const [isFirstTime, setIsFirstTime] = useState(() => !localStorage.getItem('toeic_user'))
    const [pet, setPet] = useState(null)
    const [userCoins, setUserCoins] = useState(100)
    const [currentStreak, setCurrentStreak] = useState(0)
    const [inventory, setInventory] = useState([])
    const [shopItems, setShopItems] = useState([])
    const [showShopModal, setShowShopModal] = useState(false)
    const [showCoinAnimation, setShowCoinAnimation] = useState(false)
    const [earnedCoins, setEarnedCoins] = useState(0)
    const [selectedWord, setSelectedWord] = useState(null)
    const [selectedLetter, setSelectedLetter] = useState(null)

    // Load all data from JSON
    useEffect(() => {
        Promise.all([
            fetch('./data/toeic_part1.json').then(res => res.json()),
            fetch('./data/toeic_listening.json').then(res => res.json()),
            fetch('./data/toeic_grammar.json').then(res => res.json()),
            fetch('./data/toeic_reading.json').then(res => res.json()),
            fetch('./data/shop_data.json').then(res => res.json())
        ])
            .then(([vocabData, listenData, gramData, readData, shopData]) => {
                // Pre-index sentences for performance
                const sentencesByVocab = {};
                (vocabData.sentences || []).forEach(s => {
                    if (!sentencesByVocab[s.vocab_id]) sentencesByVocab[s.vocab_id] = [];
                    sentencesByVocab[s.vocab_id].push({
                        id: s.id,
                        sentence_en: s.sentence_en,
                        sentence_zh: s.sentence_zh
                    });
                });

                // Normalize vocabData (toeic_part1.json)
                const normalizedVocab = {
                    categories: vocabData.categories.map(cat => ({
                        id: cat.id,
                        name: cat.title_zh,
                        emoji: '📚',
                        description: `多益單字 - ${cat.title_zh}`
                    })),
                    vocabulary: vocabData.vocab_items.map(item => ({
                        id: item.id,
                        word: item.word,
                        part_of_speech: item.pos,
                        meaning: Array.isArray(item.meaning_zh) ? item.meaning_zh.join(', ') : item.meaning_zh,
                        phonetic: item.phonetic,
                        category_id: item.category_id,
                        sentences: sentencesByVocab[item.id] || [],
                        questions: (vocabData.questions || []).filter(q => q.vocab_id === item.id).map(q => ({
                            id: q.id,
                            vocab_id: q.vocab_id,
                            sentence_id: q.sentence_id,
                            type: q.type,
                            prompt_en: q.prompt_en,
                            prompt_zh: q.prompt_zh,
                            full_sentence: q.full_sentence,
                            choices: q.choices,
                            answer_index: q.answer_index,
                            explanation: q.explanation_zh,
                            level: q.level || 'easy',
                            topic: q.topic,
                            word: q.word,
                            meaning: q.meaning
                        }))
                    }))
                }
                setData(normalizedVocab)

                // Normalize listeningData
                setListeningData({
                    questions: (listenData.listening_tests || []).map(q => ({
                        ...q,
                        explanation: q.explanation_zh
                    }))
                })

                // Normalize grammarData
                setGrammarData({
                    questions: (gramData.grammar_tests || []).map(q => ({
                        ...q,
                        explanation: q.explanation_zh
                    }))
                })

                // Normalize readingData
                setReadingData({
                    passages: (readData.reading_tests || []).map(p => ({
                        ...p,
                        questions: p.questions.map(q => ({
                            ...q,
                            explanation: q.explanation_zh
                        }))
                    }))
                })

                setShopItems(shopData.shop_items)
                loadWrongAnswersFromStorage()
                loadUserData()
                setLoading(false)
            })
            .catch(err => {
                setError('Failed to load data: ' + err.message)
                setLoading(false)
            })
    }, [])

    // Update pet state periodically
    useEffect(() => {
        if (!pet) return

        const interval = setInterval(() => {
            const updatedPet = restorePet(pet)
            updatedPet.update()
            setPet(updatedPet)
            savePetToStorage(updatedPet)
        }, 60000) // Every minute

        return () => clearInterval(interval)
    }, [pet])

    // Load user data from localStorage
    const loadUserData = () => {
        const userData = localStorage.getItem('toeic_user')
        const petData = localStorage.getItem('toeic_pet')
        const inventoryData = localStorage.getItem('toeic_inventory')
        const coinsData = localStorage.getItem('toeic_coins')

        if (userData) {
            const user = JSON.parse(userData)
            setUser(user)
            setIsFirstTime(false)
        }

        if (petData) {
            const restoredPet = restorePet(JSON.parse(petData))
            restoredPet.update()
            setPet(restoredPet)
            savePetToStorage(restoredPet)
        }

        if (inventoryData) {
            setInventory(JSON.parse(inventoryData))
        }

        if (coinsData) {
            setUserCoins(parseInt(coinsData))
        }
    }

    // Save user data
    const saveUserData = (userData) => {
        localStorage.setItem('toeic_user', JSON.stringify(userData))
    }

    const savePetToStorage = (petData) => {
        localStorage.setItem('toeic_pet', JSON.stringify(petData))
    }

    const saveInventoryToStorage = (inventoryData) => {
        localStorage.setItem('toeic_inventory', JSON.stringify(inventoryData))
    }

    const saveCoinsToStorage = (coins) => {
        localStorage.setItem('toeic_coins', coins.toString())
    }

    // Create new user
    const createNewUser = (username, petType) => {
        const newUser = {
            username,
            createdAt: new Date().toISOString(),
            totalQuestions: 0,
            correctAnswers: 0
        }

        const newPet = new Pet(petType, `${username}的${petType === 'cat' ? '貓咪' : '小狗'}`)

        setUser(newUser)
        setPet(newPet)
        setUserCoins(100)
        setInventory([])

        saveUserData(newUser)
        savePetToStorage(newPet)
        saveCoinsToStorage(100)
        saveInventoryToStorage([])

        setIsFirstTime(false)
    }

    // Coin system
    const calculateCoinReward = (difficulty, isCorrect) => {
        if (!isCorrect) return 0

        const baseReward = {
            'easy': 10,
            'medium': 15,
            'hard': 25
        }

        const streakBonus = Math.floor(currentStreak / 3) * 5
        return (baseReward[difficulty] || 10) + streakBonus
    }

    const showCoinEarned = (coins) => {
        setEarnedCoins(coins)
        setShowCoinAnimation(true)
        setTimeout(() => setShowCoinAnimation(false), 1500)
    }

    // Purchase item
    const purchaseItem = (item) => {
        console.log('Attempting to purchase:', item)
        console.log('Current coins:', userCoins)
        console.log('Item price:', item.price)

        if (userCoins >= item.price) {
            const newCoins = userCoins - item.price
            const newInventory = [...inventory, { ...item, purchaseDate: new Date().toISOString() }]

            setUserCoins(newCoins)
            setInventory(newInventory)

            saveCoinsToStorage(newCoins)
            saveInventoryToStorage(newInventory)

            console.log('Purchase successful! New coins:', newCoins)
            alert(`購買成功！獲得 ${item.emoji} ${item.name}`)

            // Close modal after purchase
            setShowShopModal(false)
        } else {
            console.log('Insufficient coins')
            alert('金幣不足！繼續答題賺取更多金幣吧！')
        }
    }

    // Pet actions
    const feedPet = (foodItem) => {
        if (!pet) return

        const updatedPet = restorePet(pet)
        updatedPet.feed(foodItem)
        setPet(updatedPet)
        savePetToStorage(updatedPet)

        // Remove item from inventory
        const itemIndex = inventory.findIndex(item =>
            item.id === foodItem.id && item.purchaseDate === foodItem.purchaseDate
        )
        if (itemIndex !== -1) {
            const newInventory = [...inventory.slice(0, itemIndex), ...inventory.slice(itemIndex + 1)]
            setInventory(newInventory)
            saveInventoryToStorage(newInventory)
        }

        alert(`${pet.name} 吃得很開心！飽食度 +${foodItem.hunger_recovery}`)
    }

    const cleanPet = () => {
        if (!pet) return

        const updatedPet = restorePet(pet)
        updatedPet.clean()
        setPet(updatedPet)
        savePetToStorage(updatedPet)

        alert(`${pet.name} 現在乾淨多了！快樂度 +10`)
    }

    const useItem = (item) => {
        if (!pet) return

        const updatedPet = restorePet(pet)
        if (item.happiness_boost) {
            updatedPet.happiness = Math.min(100, updatedPet.happiness + item.happiness_boost)
        }
        setPet(updatedPet)
        savePetToStorage(updatedPet)

        // Remove item from inventory
        const itemIndex = inventory.findIndex(i =>
            i.id === item.id && i.purchaseDate === item.purchaseDate
        )
        if (itemIndex !== -1) {
            const newInventory = [...inventory.slice(0, itemIndex), ...inventory.slice(itemIndex + 1)]
            setInventory(newInventory)
            saveInventoryToStorage(newInventory)
        }

        alert(`${pet.name} 玩得很開心！快樂度 +${item.happiness_boost}`)
    }

    // Web Speech API pronunciation function
    const speakText = (text, lang = 'en-US') => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel()
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.lang = lang
            utterance.rate = 0.9
            window.speechSynthesis.speak(utterance)
        } else {
            alert('Your browser does not support speech synthesis')
        }
    }

    // LocalStorage functions
    const loadWrongAnswersFromStorage = () => {
        const stored = localStorage.getItem('toeic_wrong_answers')
        if (stored) {
            setWrongAnswers(JSON.parse(stored))
        }
    }

    const saveWrongAnswerToStorage = (questionId) => {
        let stored = localStorage.getItem('toeic_wrong_answers')
        let wrongList = stored ? JSON.parse(stored) : []

        if (!wrongList.includes(questionId)) {
            wrongList.push(questionId)
            localStorage.setItem('toeic_wrong_answers', JSON.stringify(wrongList))
            setWrongAnswers(wrongList)
        }
    }

    const clearWrongAnswers = () => {
        localStorage.setItem('toeic_wrong_answers', JSON.stringify([]))
        setWrongAnswers([])
    }

    // Quiz generation
    const generateQuiz = (categoryId = null, isReview = false) => {
        if (!data) return []

        let questions = []

        if (isReview) {
            questions = data.vocabulary.flatMap(vocab =>
                vocab.questions.filter(q => wrongAnswers.includes(q.id))
            )
        } else if (categoryId) {
            const category = data.categories.find(c => c.id === categoryId)
            const vocabList = data.vocabulary.filter(v => v.category_id === categoryId)
            questions = vocabList.flatMap(vocab => vocab.questions)
        } else {
            questions = data.vocabulary.flatMap(vocab => vocab.questions)
        }

        return questions.sort(() => Math.random() - 0.5)
    }

    const startStudy = (categoryId) => {
        const vocabList = data.vocabulary.filter(v => v.category_id === categoryId)
        setCategoryVocabs(vocabList)
        setCurrentVocabIndex(0)
        setSelectedCategory(categoryId)
        setMode('study')
    }

    const startQuiz = (categoryId = null) => {
        const questions = generateQuiz(categoryId, false)
        setQuizQuestions(questions)
        setCurrentQuizIndex(0)
        setSelectedAnswer(null)
        setShowExplanation(false)
        setScore(0)
        setMode('quiz')
    }

    const startReview = () => {
        if (wrongAnswers.length === 0) {
            alert('沒有錯誤記錄！')
            return
        }
        const questions = generateQuiz(null, true)
        setQuizQuestions(questions)
        setCurrentQuizIndex(0)
        setSelectedAnswer(null)
        setShowExplanation(false)
        setScore(0)
        setMode('quiz')
    }

    const startListeningTest = () => {
        if (!listeningData) return
        setQuizQuestions(listeningData.questions)
        setCurrentQuizIndex(0)
        setSelectedAnswer(null)
        setShowExplanation(false)
        setScore(0)
        setMode('listening')
    }

    const startGrammarTest = () => {
        if (!grammarData) return
        // Randomly shuffle and select 20 questions from the pool
        const shuffled = [...grammarData.questions].sort(() => Math.random() - 0.5)
        const selectedQuestions = shuffled.slice(0, 20)
        setQuizQuestions(selectedQuestions)
        setCurrentQuizIndex(0)
        setSelectedAnswer(null)
        setShowExplanation(false)
        setScore(0)
        setMode('grammar')
    }

    const startReadingTest = () => {
        if (!readingData) return
        const firstPassage = readingData.passages[0]
        setCurrentPassageIndex(0)
        setCurrentPassageQuestions(firstPassage.questions)
        setQuizQuestions(firstPassage.questions)
        setCurrentQuizIndex(0)
        setSelectedAnswer(null)
        setShowExplanation(false)
        setScore(0)
        setMode('reading')
    }

    const handleAnswerSelect = (index) => {
        if (selectedAnswer !== null) return

        setSelectedAnswer(index)
        setShowExplanation(true)

        const currentQuestion = mode === 'reading'
            ? currentPassageQuestions[currentQuizIndex]
            : quizQuestions[currentQuizIndex]

        const isCorrect = index === currentQuestion.answer_index

        if (isCorrect) {
            setScore(score + 1)
            setCurrentStreak(prev => prev + 1)

            // Award coins for correct answer
            const difficulty = currentQuestion.difficulty || 'easy'
            const coinReward = calculateCoinReward(difficulty, true)
            const newCoins = userCoins + coinReward
            setUserCoins(newCoins)
            saveCoinsToStorage(newCoins)
            showCoinEarned(coinReward)

            // Update user stats
            if (user) {
                const updatedUser = {
                    ...user,
                    totalQuestions: user.totalQuestions + 1,
                    correctAnswers: user.correctAnswers + 1
                }
                setUser(updatedUser)
                saveUserData(updatedUser)
            }
        } else {
            saveWrongAnswerToStorage(currentQuestion.id)
            setCurrentStreak(0)

            // Update user stats
            if (user) {
                const updatedUser = {
                    ...user,
                    totalQuestions: user.totalQuestions + 1
                }
                setUser(updatedUser)
                saveUserData(updatedUser)
            }
        }
    }

    const handleNextQuestion = () => {
        if (mode === 'reading') {
            if (currentQuizIndex < currentPassageQuestions.length - 1) {
                setCurrentQuizIndex(currentQuizIndex + 1)
                setSelectedAnswer(null)
                setShowExplanation(false)
            } else {
                if (currentPassageIndex < readingData.passages.length - 1) {
                    const nextPassageIndex = currentPassageIndex + 1
                    const nextPassage = readingData.passages[nextPassageIndex]
                    setCurrentPassageIndex(nextPassageIndex)
                    setCurrentPassageQuestions(nextPassage.questions)
                    setQuizQuestions(nextPassage.questions)
                    setCurrentQuizIndex(0)
                    setSelectedAnswer(null)
                    setShowExplanation(false)
                } else {
                    setMode('result')
                }
            }
        } else {
            if (currentQuizIndex < quizQuestions.length - 1) {
                setCurrentQuizIndex(currentQuizIndex + 1)
                setSelectedAnswer(null)
                setShowExplanation(false)
            } else {
                setMode('result')
            }
        }
    }

    const handleNextVocab = () => {
        if (currentVocabIndex < categoryVocabs.length - 1) {
            setCurrentVocabIndex(currentVocabIndex + 1)
        }
    }

    const handlePrevVocab = () => {
        if (currentVocabIndex > 0) {
            setCurrentVocabIndex(currentVocabIndex - 1)
        }
    }

    const resetToHome = () => {
        setMode('home')
        setSelectedCategory(null)
        setCurrentQuizIndex(0)
        setQuizQuestions([])
        setSelectedAnswer(null)
        setShowExplanation(false)
        setScore(0)
        setCurrentVocabIndex(0)
        setCategoryVocabs([])
        setCurrentPassageIndex(0)
        setCurrentPassageQuestions([])
        // Scroll to top when returning to home
        window.scrollTo(0, 0)
    }

    // Show welcome screen for first-time users
    if (isFirstTime) {
        return <WelcomeScreen onCreateUser={createNewUser} />
    }

    if (loading) {
        return <div className="loading">載入中...</div>
    }

    if (error) {
        return <div className="error">{error}</div>
    }

    const currentQuestion = mode === 'reading'
        ? currentPassageQuestions[currentQuizIndex]
        : quizQuestions[currentQuizIndex]

    const totalQuestions = mode === 'reading'
        ? readingData.passages.reduce((sum, p) => sum + p.questions.length, 0)
        : quizQuestions.length

    const overallQuestionIndex = mode === 'reading'
        ? readingData.passages.slice(0, currentPassageIndex).reduce((sum, p) => sum + p.questions.length, 0) + currentQuizIndex
        : currentQuizIndex

    return (
        <div className="app">
            {/* Coin Display */}
            {user && (
                <div className="coin-display" onClick={() => setShowShopModal(true)}>
                    💰 {userCoins} 枚
                </div>
            )}

            {/* Coin Animation */}
            {showCoinAnimation && (
                <div className="coin-animation">
                    +{earnedCoins} 💰
                </div>
            )}

            {/* Shop Modal */}
            {showShopModal && (
                <ShopModal
                    shopItems={shopItems}
                    userCoins={userCoins}
                    onPurchase={purchaseItem}
                    onClose={() => setShowShopModal(false)}
                />
            )}

            {/* Home Screen */}
            {mode === 'home' && (
                <div>
                    <header className="app-header">
                        <h1>TOEIC English Learning</h1>
                        <p>多益英文學習 APP</p>
                        {user && <p className="user-welcome">歡迎回來，{user.username}！</p>}
                    </header>

                    {/* Animated Pet */}
                    {pet && <AnimatedPet pet={pet} />}

                    <div className="menu-grid">
                        <div className="menu-card menu-card-primary" onClick={() => setMode('alphabet')}>
                            <div className="menu-icon">🔤</div>
                            <h3>字母索引</h3>
                            <p>學習基礎發音</p>
                        </div>
                        <div className="menu-card menu-card-primary" onClick={() => setMode('select-category')}>
                            <div className="menu-icon">📚</div>
                            <h3>學習模式</h3>
                            <p>瀏覽分類單字</p>
                        </div>
                        <div className="menu-card menu-card-success" onClick={() => setMode('select-quiz')}>
                            <div className="menu-icon">✏️</div>
                            <h3>詞彙測驗</h3>
                            <p>測試單字能力</p>
                        </div>
                        <div className="menu-card menu-card-success" onClick={startListeningTest}>
                            <div className="menu-icon">🎧</div>
                            <h3>聽力測驗</h3>
                            <p>練習聽力理解</p>
                        </div>
                        <div className="menu-card menu-card-success" onClick={startGrammarTest}>
                            <div className="menu-icon">📝</div>
                            <h3>文法測驗</h3>
                            <p>加強文法觀念</p>
                        </div>
                        <div className="menu-card menu-card-success" onClick={startReadingTest}>
                            <div className="menu-icon">📖</div>
                            <h3>閱讀測驗</h3>
                            <p>提升閱讀速度</p>
                        </div>
                        <div className="menu-card menu-card-pet" onClick={() => setMode('pet-interaction')}>
                            <div className="menu-icon">🐱</div>
                            <h3>我的寵物</h3>
                            <p>照顧你的夥伴</p>
                        </div>
                        <div className="menu-card menu-card-shop" onClick={() => setShowShopModal(true)}>
                            <div className="menu-icon">🛒</div>
                            <h3>寵物商店</h3>
                            <p>購買食物玩具</p>
                        </div>
                        <div
                            className={`menu-card menu-card-warning ${wrongAnswers.length === 0 ? 'disabled' : ''}`}
                            onClick={wrongAnswers.length > 0 ? startReview : null}
                        >
                            <div className="menu-icon">🔄</div>
                            <h3>錯題複習</h3>
                            <p>{wrongAnswers.length} 題待複習</p>
                        </div>
                    </div>

                    {user && (
                        <div className="user-stats">
                            <h3>📊 學習統計</h3>
                            <p>總答題數: {user.totalQuestions}</p>
                            <p>正確答題: {user.correctAnswers}</p>
                            <p>正確率: {user.totalQuestions > 0 ? Math.round((user.correctAnswers / user.totalQuestions) * 100) : 0}%</p>
                        </div>
                    )}
                </div>
            )}

            {/* Pet Interaction Mode */}
            {mode === 'pet-interaction' && pet && (
                <TamagotchiDisplay
                    pet={pet}
                    onFeed={feedPet}
                    onClean={cleanPet}
                    onUseItem={useItem}
                    inventory={inventory}
                    onShop={() => setShowShopModal(true)}
                    onBack={() => setMode('home')}
                />
            )}

            {/* Alphabet Index */}
            {mode === 'alphabet' && (() => {
                const kkPhonetics = {
                    A: '/eɪ/', B: '/biː/', C: '/siː/', D: '/diː/', E: '/iː/',
                    F: '/ɛf/', G: '/dʒiː/', H: '/eɪtʃ/', I: '/aɪ/', J: '/dʒeɪ/',
                    K: '/keɪ/', L: '/ɛl/', M: '/ɛm/', N: '/ɛn/', O: '/oʊ/',
                    P: '/piː/', Q: '/kjuː/', R: '/ɑːr/', S: '/ɛs/', T: '/tiː/',
                    U: '/juː/', V: '/viː/', W: '/ˈdʌbəl juː/', X: '/ɛks/',
                    Y: '/waɪ/', Z: '/ziː/'
                }
                const letterExamples = {
                    A: [
                        "The annual report was approved by the board of directors.",
                        "All applicants must submit the required documents before the deadline."
                    ],
                    B: [
                        "The budget allocation was discussed during the quarterly meeting.",
                        "Our branch office in Tokyo will be relocated next month."
                    ],
                    C: [
                        "The company plans to collaborate with international partners.",
                        "Customer satisfaction has increased considerably this quarter."
                    ],
                    D: [
                        "The department announced a new policy regarding remote work.",
                        "Delivery delays may occur due to severe weather conditions."
                    ],
                    E: [
                        "Employees are encouraged to participate in the training program.",
                        "The executive committee will evaluate the proposal next week."
                    ],
                    F: [
                        "Financial reports must be filed before the end of the fiscal year.",
                        "The factory has improved its production efficiency significantly."
                    ],
                    G: [
                        "The government has issued new guidelines for workplace safety.",
                        "Graduates are welcome to apply for entry-level positions."
                    ],
                    H: [
                        "Human resources will conduct interviews throughout the week.",
                        "The hotel offers complimentary breakfast for all registered guests."
                    ],
                    I: [
                        "The invoice should be submitted to the accounting department.",
                        "Innovation is essential for maintaining a competitive advantage."
                    ],
                    J: [
                        "Job seekers are advised to update their resumes regularly.",
                        "The joint venture between the two companies was very successful."
                    ],
                    K: [
                        "Keeping accurate records is crucial for financial auditing.",
                        "The keynote speaker emphasized the importance of leadership."
                    ],
                    L: [
                        "The lease agreement will expire at the end of this month.",
                        "Logistics management plays a vital role in supply chain operations."
                    ],
                    M: [
                        "The marketing team launched a new advertising campaign.",
                        "Manufacturing costs have been reduced through process optimization."
                    ],
                    N: [
                        "Negotiations between the two parties are still ongoing.",
                        "New regulations require companies to disclose environmental data."
                    ],
                    O: [
                        "The organization will host its annual conference in September.",
                        "Overtime work must be approved by the department manager."
                    ],
                    P: [
                        "The project deadline has been extended by two weeks.",
                        "Please review the proposal and provide your feedback by Friday."
                    ],
                    Q: [
                        "Quality control procedures must be followed at every stage.",
                        "The quarterly earnings exceeded analysts' expectations."
                    ],
                    R: [
                        "The renovation of the office building will begin next month.",
                        "Research findings indicate a growing demand for renewable energy."
                    ],
                    S: [
                        "Sales revenue increased by fifteen percent compared to last year.",
                        "The supervisor scheduled a meeting with the entire team."
                    ],
                    T: [
                        "The training workshop will be held in the main conference room.",
                        "Transportation costs account for a significant portion of expenses."
                    ],
                    U: [
                        "The university offers a wide range of professional courses.",
                        "Updating software regularly helps protect against security threats."
                    ],
                    V: [
                        "Volunteers are needed for the upcoming community event.",
                        "The vendor provided a competitive quote for the supplies."
                    ],
                    W: [
                        "The warehouse manager reported a shortage of inventory.",
                        "Workers must wear safety equipment in the construction area."
                    ],
                    X: [
                        "The X-ray results will be available within twenty-four hours.",
                        "Xerox copies of the contract should be kept in the filing cabinet."
                    ],
                    Y: [
                        "The yearly performance review will determine salary adjustments.",
                        "Yield on government bonds has declined over the past quarter."
                    ],
                    Z: [
                        "Zoning regulations must be considered before constructing a building.",
                        "The company aims for zero defects in its manufacturing process."
                    ]
                }

                return (
                    <div className="alphabet-page">
                        <div className="alphabet-sticky-header">
                            <div className="alphabet-top-bar">
                                <span className="coin-badge">💰 {user?.coins || 0} 枚</span>
                                <button className="floating-home-btn" onClick={resetToHome}>🏠 返回首頁</button>
                            </div>

                            <div className="alphabet-title-section">
                                <h1>🔤 字母索引</h1>
                                <p>點擊字母快速跳轉，每個字母附有 KK 音標與例句</p>
                            </div>

                            <div className="alphabet-nav">
                                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                                    <div
                                        key={letter}
                                        className={`alphabet-letter ${selectedLetter === letter ? 'active' : ''}`}
                                        onClick={() => {
                                            setSelectedLetter(selectedLetter === letter ? null : letter)
                                            const el = document.getElementById(`letter-${letter}`)
                                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                        }}
                                    >
                                        {letter}
                                    </div>
                                ))}
                            </div>

                            {selectedWord ? (
                                <div className="letter-detail-sticky-panel">
                                    <div className="panel-top">
                                        <div className="letter-badge-group word-badge-group">
                                            <span className="current-letter word-title">{selectedWord.word}</span>
                                            <button className="speak-btn small-panel" onClick={() => speakText(selectedWord.word)}>🔊</button>
                                        </div>
                                        <button className="close-panel-btn" onClick={() => setSelectedWord(null)}>✕</button>
                                    </div>
                                    <div className="word-detail-info-panel">
                                        <span className="part-of-speech-tag">{selectedWord.part_of_speech}</span>
                                        <span className="meaning-text-panel">{selectedWord.meaning}</span>
                                    </div>
                                    <div className="panel-sentences">
                                        <h3 className="panel-subtitle">📚 例句</h3>
                                        {selectedWord.sentences && selectedWord.sentences.map((s, i) => (
                                            <div key={i} className="panel-sentence-item-word">
                                                <div className="sentence-en-row">
                                                    <span className="sentence-text">{s.sentence_en}</span>
                                                    <button className="speak-btn tiny" onClick={() => speakText(s.sentence_en)}>🔊</button>
                                                </div>
                                                <div className="sentence-zh-row">{s.sentence_zh}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : selectedLetter && letterExamples[selectedLetter] && (
                                <div className="letter-detail-sticky-panel">
                                    <div className="panel-top">
                                        <div className="letter-badge-group">
                                            <span className="current-letter">{selectedLetter}</span>
                                            <span className="kk-badge-panel">{kkPhonetics[selectedLetter]}</span>
                                            <button className="speak-btn small-panel" onClick={() => speakText(selectedLetter)}>🔊</button>
                                        </div>
                                        <button className="close-panel-btn" onClick={() => setSelectedLetter(null)}>✕</button>
                                    </div>
                                    <div className="panel-sentences">
                                        {letterExamples[selectedLetter].map((s, i) => (
                                            <div key={i} className="panel-sentence-item">
                                                <button className="speak-btn tiny" onClick={() => speakText(s)}>🔊</button>
                                                <span className="sentence-text">{s}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="alphabet-container">
                            {data && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => {
                                const wordsForLetter = data.vocabulary.filter(v =>
                                    v.word.toUpperCase().startsWith(letter)
                                )

                                if (wordsForLetter.length === 0) return null

                                return (
                                    <div key={letter} id={`letter-${letter}`} className="alphabet-section">
                                        <div className="letter-header">
                                            <h2>{letter}</h2>
                                            <span className="kk-phonetic">{kkPhonetics[letter]}</span>
                                            <button
                                                className="speak-btn letter-speak-btn"
                                                onClick={() => speakText(letter)}
                                                title={`聽 ${letter} 的發音`}
                                            >
                                                🔊
                                            </button>
                                        </div>

                                        <div className="word-grid">
                                            {wordsForLetter.map(vocab => (
                                                <div key={vocab.id} className="word-item" onClick={() => setSelectedWord(vocab)}>
                                                    <div className="word-header">
                                                        <strong>{vocab.word}</strong>
                                                        <button
                                                            className="speak-btn"
                                                            onClick={(e) => { e.stopPropagation(); speakText(vocab.word); }}
                                                        >
                                                            🔊
                                                        </button>
                                                    </div>
                                                    <div className="word-info">
                                                        <span className="part-of-speech">{vocab.part_of_speech}</span>
                                                        <span className="meaning">{vocab.meaning}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })()}

            {/* Category Selection */}
            {mode === 'select-category' && data && (
                <div>
                    <header className="app-header">
                        <h1>選擇學習類別</h1>
                    </header>
                    <div className="categories">
                        {data.categories.map(category => {
                            const vocabCount = data.vocabulary.filter(v => v.category_id === category.id).length
                            return (
                                <div
                                    key={category.id}
                                    className="category-card"
                                    onClick={() => startStudy(category.id)}
                                >
                                    <h3>{category.emoji} {category.name}</h3>
                                    <p>{category.description}</p>
                                    <p className="vocab-count">{vocabCount} 個單字</p>
                                </div>
                            )
                        })}
                    </div>
                    <button className="btn btn-primary" onClick={resetToHome}>🏠 返回首頁</button>
                </div>
            )}

            {/* Quiz Category Selection */}
            {mode === 'select-quiz' && data && (
                <div>
                    <header className="app-header">
                        <h1>選擇測驗類別</h1>
                    </header>
                    <div className="categories">
                        <div className="category-card" onClick={() => startQuiz(null)}>
                            <h3>🌟 全部測驗</h3>
                            <p>測試所有單字</p>
                        </div>
                        {data.categories.map(category => {
                            const vocabCount = data.vocabulary.filter(v => v.category_id === category.id).length
                            return (
                                <div
                                    key={category.id}
                                    className="category-card"
                                    onClick={() => startQuiz(category.id)}
                                >
                                    <h3>{category.emoji} {category.name}</h3>
                                    <p>{category.description}</p>
                                    <p className="vocab-count">{vocabCount * 2} 道題目</p>
                                </div>
                            )
                        })}
                    </div>
                    <button className="btn btn-primary" onClick={resetToHome}>🏠 返回首頁</button>
                </div>
            )}

            {/* Study Mode */}
            {mode === 'study' && data && categoryVocabs.length > 0 && (
                <div>
                    <header className="app-header">
                        <h1>學習模式</h1>
                        <p>單字 {currentVocabIndex + 1} / {categoryVocabs.length}</p>
                    </header>

                    <div className="vocab-card">
                        <div className="vocab-word-section">
                            <div className="vocab-word-header">
                                <h2>{categoryVocabs[currentVocabIndex].word}</h2>
                                {categoryVocabs[currentVocabIndex].phonetic && (
                                    <span className="kk-phonetic-badge">{categoryVocabs[currentVocabIndex].phonetic}</span>
                                )}
                                <button
                                    className="speak-btn"
                                    onClick={() => speakText(categoryVocabs[currentVocabIndex].word)}
                                >
                                    🔊
                                </button>
                            </div>
                            <p className="part-of-speech">{categoryVocabs[currentVocabIndex].part_of_speech}</p>
                            <p className="meaning">{categoryVocabs[currentVocabIndex].meaning}</p>
                        </div>

                        <div className="vocab-examples-section">
                            <h3>📚 例句</h3>
                            {categoryVocabs[currentVocabIndex].sentences && categoryVocabs[currentVocabIndex].sentences.length > 0 ? (
                                categoryVocabs[currentVocabIndex].sentences.map((sent, idx) => (
                                    <div key={idx} className="vocab-example">
                                        <div className="example-header">
                                            <span className="example-label">例句 {idx + 1}</span>
                                            <button
                                                className="speak-btn small"
                                                onClick={() => speakText(sent.sentence_en)}
                                                title="播放例句"
                                            >
                                                🔊
                                            </button>
                                        </div>
                                        <p className="example-en">{sent.sentence_en}</p>
                                        <p className="example-zh">{sent.sentence_zh}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="vocab-example">
                                    <div className="example-header">
                                        <h3>例句</h3>
                                        <button
                                            className="speak-btn"
                                            onClick={() => speakText(categoryVocabs[currentVocabIndex].example)}
                                        >
                                            🔊
                                        </button>
                                    </div>
                                    <p className="example-en">{categoryVocabs[currentVocabIndex].example}</p>
                                    <p className="example-zh">{categoryVocabs[currentVocabIndex].example_translation}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="navigation-buttons">
                        <button
                            className="btn btn-secondary"
                            onClick={handlePrevVocab}
                            disabled={currentVocabIndex === 0}
                        >
                            ← 上一個
                        </button>
                        <button className="btn btn-primary" onClick={resetToHome}>
                            🏠 返回首頁
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={handleNextVocab}
                            disabled={currentVocabIndex === categoryVocabs.length - 1}
                        >
                            下一個 →
                        </button>
                    </div>
                </div>
            )}

            {/* Quiz Mode */}
            {(mode === 'quiz' || mode === 'listening' || mode === 'grammar') && currentQuestion && (
                <div>
                    <header className="app-header">
                        <h1>
                            {mode === 'listening' && '🎧 聽力測驗'}
                            {mode === 'grammar' && '📝 文法測驗'}
                            {mode === 'quiz' && '✏️ 詞彙測驗'}
                        </h1>
                        <p>題目 {currentQuizIndex + 1} / {quizQuestions.length}</p>
                        <p className="score-display">得分：{score} / {quizQuestions.length}</p>
                    </header>

                    <div className="quiz-container">
                        {mode === 'listening' && (
                            <div className="listening-container">
                                {currentQuestion.image_url && (
                                    <div className="listening-image-container">
                                        <img
                                            src={currentQuestion.image_url}
                                            alt="Listening question"
                                            className="listening-image"
                                        />
                                    </div>
                                )}
                                <div className="question-type">
                                    💬 {currentQuestion.type}
                                </div>
                                <button
                                    className="audio-controls"
                                    onClick={() => speakText(currentQuestion.audio_text)}
                                >
                                    🔊 播放音訊
                                </button>
                            </div>
                        )}

                        {mode === 'grammar' && (
                            <div className="grammar-point">
                                📘 {currentQuestion.grammar_point}
                            </div>
                        )}

                        <div className="question-section">
                            <div className="question-prompt">
                                {mode === 'quiz' && currentQuestion.prompt_en && (
                                    <p className="prompt-text">{currentQuestion.prompt_en}</p>
                                )}
                                {currentQuestion.question && (
                                    <p className="question-text">{currentQuestion.question}</p>
                                )}
                                {currentQuestion.translation && (
                                    <p className="question-translation">{currentQuestion.translation}</p>
                                )}

                                {/* New: Show choices text in prompt for Vocabulary Quiz */}
                                {mode === 'quiz' && currentQuestion.choices && (
                                    <div className="prompt-choices">
                                        {currentQuestion.choices.map((choice, i) => (
                                            <div key={i} className="prompt-choice-item">
                                                <span className="prompt-choice-letter">({String.fromCharCode(65 + i)})</span>
                                                <span className="prompt-choice-text">{choice}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={`choices-grid ${mode === 'quiz' ? 'quiz-letters-only' : ''}`}>
                            {currentQuestion.choices.map((choice, index) => (
                                <button
                                    key={index}
                                    className={`choice-card ${selectedAnswer === index
                                        ? (index === currentQuestion.answer_index ? 'choice-correct' : 'choice-incorrect')
                                        : ''
                                        }`}
                                    onClick={() => handleAnswerSelect(index)}
                                    disabled={selectedAnswer !== null}
                                >
                                    <span className="choice-letter">{String.fromCharCode(65 + index)}</span>
                                    {/* Hide choice text in button for Quiz mode */}
                                    {mode !== 'quiz' && <span className="choice-text">{choice}</span>}

                                    {selectedAnswer === index && (
                                        <span className="choice-icon">
                                            {index === currentQuestion.answer_index ? '✓' : '✗'}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {showExplanation && (
                            <div className={`explanation ${selectedAnswer === currentQuestion.answer_index ? 'correct' : 'incorrect'}`}>
                                {mode === 'listening' && currentQuestion.audio_text && (
                                    <div className="audio-transcript">
                                        <strong>💬 簡短對話：</strong>
                                        <p>{currentQuestion.audio_text}</p>
                                        {currentQuestion.audio_translation && (
                                            <p className="transcript-translation">{currentQuestion.audio_translation}</p>
                                        )}
                                    </div>
                                )}

                                {mode === 'quiz' && (
                                    <>
                                        {currentQuestion.full_sentence && (
                                            <div className="full-sentence-section">
                                                <strong>✓ 完整句子：</strong>
                                                <p className="full-sentence-text">{currentQuestion.full_sentence}</p>
                                            </div>
                                        )}
                                    </>
                                )}

                                <div className="explanation-text">
                                    <strong>💡 解析：</strong>
                                    {currentQuestion.explanation}
                                </div>
                            </div>
                        )}

                        {selectedAnswer !== null && (
                            <button className="btn btn-primary next-btn" onClick={handleNextQuestion}>
                                {currentQuizIndex < quizQuestions.length - 1 ? '下一題 →' : '查看結果'}
                            </button>
                        )}
                    </div>

                    <button className="btn btn-secondary" onClick={resetToHome}>放棄測驗</button>
                </div>
            )}

            {/* Reading Mode */}
            {mode === 'reading' && readingData && currentQuestion && (
                <div>
                    <header className="app-header">
                        <h1>📖 閱讀測驗</h1>
                        <p>文章 {currentPassageIndex + 1} / {readingData.passages.length} - 題目 {overallQuestionIndex + 1} / {totalQuestions}</p>
                        <p className="score-display">得分：{score} / {totalQuestions}</p>
                    </header>

                    <div className="reading-container">
                        <div className="passage-container">
                            <h3>{readingData.passages[currentPassageIndex].title}</h3>
                            <div className="passage-text">
                                {readingData.passages[currentPassageIndex].content}
                            </div>
                            <div className="passage-translation">
                                <strong>📖 中文翻譯：</strong>
                                <p>{readingData.passages[currentPassageIndex].translation}</p>
                            </div>
                        </div>

                        <div className="question-container">
                            <div className="question">
                                <p><strong>Q{currentQuizIndex + 1}:</strong> {currentQuestion.question}</p>
                            </div>

                            <div className="choices">
                                {currentQuestion.choices.map((choice, index) => (
                                    <button
                                        key={index}
                                        className={`choice ${selectedAnswer === index ? (index === currentQuestion.answer_index ? 'correct' : 'incorrect') : ''}`}
                                        onClick={() => handleAnswerSelect(index)}
                                        disabled={selectedAnswer !== null}
                                    >
                                        {String.fromCharCode(65 + index)}. {choice}
                                    </button>
                                ))}
                            </div>

                            {showExplanation && (
                                <div className={`explanation ${selectedAnswer === currentQuestion.answer_index ? 'correct' : 'incorrect'}`}>
                                    <strong>解析：</strong>
                                    {currentQuestion.explanation}
                                </div>
                            )}

                            {selectedAnswer !== null && (
                                <button className="btn btn-primary next-btn" onClick={handleNextQuestion}>
                                    {(currentPassageIndex === readingData.passages.length - 1 && currentQuizIndex === currentPassageQuestions.length - 1)
                                        ? '查看結果'
                                        : '下一題 →'}
                                </button>
                            )}
                        </div>
                    </div>

                    <button className="btn btn-secondary" onClick={resetToHome}>放棄測驗</button>
                </div>
            )}

            {/* Results */}
            {mode === 'result' && (
                <div>
                    <header className="app-header">
                        <h1>測驗結果</h1>
                    </header>

                    <div className="result-container">
                        <h2 className="result-score">
                            {score} / {totalQuestions}
                        </h2>
                        <p className="result-percentage">
                            正確率: {Math.round((score / totalQuestions) * 100)}%
                        </p>

                        {score === totalQuestions && (
                            <div className="result-perfect">
                                🎉 完美！全部答對！
                            </div>
                        )}

                        {score >= totalQuestions * 0.8 && score < totalQuestions && (
                            <div className="result-great">
                                👍 做得很好！
                            </div>
                        )}

                        {score >= totalQuestions * 0.6 && score < totalQuestions * 0.8 && (
                            <div className="result-good">
                                ✨ 不錯！繼續加油！
                            </div>
                        )}

                        {score < totalQuestions * 0.6 && (
                            <div className="result-keep-going">
                                💪 繼續努力！
                            </div>
                        )}

                        <div className="streak-display">
                            🔥 當前連續答對: {currentStreak} 題
                        </div>
                    </div>

                    <div className="result-actions">
                        <button className="btn btn-primary" onClick={resetToHome}>
                            🏠 返回首頁
                        </button>
                        <button className="btn btn-success" onClick={() => {
                            if (mode === 'reading') {
                                startReadingTest()
                            } else if (mode === 'listening') {
                                startListeningTest()
                            } else if (mode === 'grammar') {
                                startGrammarTest()
                            } else {
                                startQuiz(selectedCategory)
                            }
                        }}>
                            🔄 再測一次
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default App
