export default async function elemChildrenJQ (object:any, Nchildren:number|string) {
    // if the type is string it must
    if (typeof Nchildren === 'string' && Nchildren.toLowerCase() === 'all') {
        return 'all'
    } 
    else if (typeof Nchildren === 'number') {
        return 1
    }
}