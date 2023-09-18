import { TDropdown } from "@/views/search_params/types";

export enum Sorted {
    NULL,
    UP,
    DOWN
}

export class ColumnMainTable {
    field     : string = '';
    width     : string = '';
    label     : string = '';
    sorted    : Sorted = null;
    sortedKey : string  = ''

    constructor(
        field    : string,
        width    : string,
        label    : string,
        sortedKey: string,
        sorted   : Sorted = Sorted.NULL
    ) {
        this.field     = field
        this.width     = width
        this.label     = label
        this.sorted    = sorted
        this.sortedKey = sortedKey
    }
}


export const createMainTableColumns = (

    scoreTypes:TDropdown[],
    sortedIdx:number,
    sorted:Sorted

):ColumnMainTable[] => {

    let result : ColumnMainTable[] = []

    result.push( new ColumnMainTable('name', '2fr', 'main_page.name', 'name' ))
    result.push( new ColumnMainTable('source_type', '1fr', 'main_page.source', 'source' ) )

    scoreTypes.forEach( el => result.push( new ColumnMainTable(  el.key, '1fr' , el.tableHeader, el.sortedKey ) ))

    if ( sorted == Sorted.UP ) {
        result[sortedIdx].sorted = Sorted.UP
        result[sortedIdx].sortedKey += '_up'
    }
    if ( sorted == Sorted.DOWN) {
        result[sortedIdx].sorted = Sorted.DOWN
        result[sortedIdx].sortedKey += '_down'
    }

    return result
}