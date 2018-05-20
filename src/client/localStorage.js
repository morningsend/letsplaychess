const app = 'lets_play_chess'
export const loadState = () => {
    try{
        const serializedState = localStorage.getItem(app)
        if(serializedState) {
            return JSON.parse(serializedState)
        } else {
            return undefined
        }
    } catch(error) {
        console.error(error)
        return undefined
    }
}

export const saveState = (state) => {
    try{
        const serializd = JSON.stringify(state)
        localStorage.setItem(app, serializd)
    } catch (error) {
        console.error(error)
    }
}

export const clearState = () => {
    try{
        localStorage.removeItem(app)
    } catch(error) {
        console.error(error)
    }
}