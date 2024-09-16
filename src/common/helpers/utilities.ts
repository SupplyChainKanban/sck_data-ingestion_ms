

export const delay = (ms: number) => {
    return new Promise(
        (res, rej) => {
            setTimeout(() => {
                console.log('Acabó el tiempo ')
                res(true)
            }, ms);
        }
    )
}