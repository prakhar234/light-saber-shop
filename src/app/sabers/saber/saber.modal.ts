export interface Saber {
    id?: string,
    name: string,
    available: number,
    showDetail?: boolean,
    crystal: Crystal
}

export interface Crystal {
    name: string,
    color: string,
    powerUsage: number,
    planet: number
}