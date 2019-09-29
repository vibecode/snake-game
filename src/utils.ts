export const getHighScoreFromStorage = () => {
  try {
    const highScore = localStorage.getItem('highScore')
    return highScore != null ? parseInt(highScore) : null
  } catch (err) {
    console.log(err)
  }
}

export const setHighScoreToStorage = (score: number) => {
  try {
    localStorage.setItem('highScore', score.toString())
  } catch (err) {
    console.log(err)
  }
}
