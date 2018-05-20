export function debounce(func, delay) {
    let timeout
    return () => {
        const context = this
        const args = arguments
        var later = () => {
            timeout = null;
            func.apply(context, args)
        }
        const callNow = !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, delay)
        if(callNow) {
            func.apply(context, args)
        }
    }
}