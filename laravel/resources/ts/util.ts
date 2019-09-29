export function getCookieValue (searchKey?: string): string {
    if (searchKey === undefined) {
        return ''
    }

    let val = ''

    document.cookie.split(';').forEach(cookie => {
        const [key, value] = cookie.split('=')
        if (key === searchKey) {
            val = value
            return
        }
    })

    return val
}
