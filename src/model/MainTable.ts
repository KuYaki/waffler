import { TDropdown } from "@/views/search_params/types";

export enum Sorted {
    NULL,
    UP,
    DOWN
}

export class TableColumn {
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

):TableColumn[] => {

    let result : TableColumn[] = []

    result.push( new TableColumn('name', '2fr', 'main_page.name', 'name' ))
    result.push( new TableColumn('source_type', '1fr', 'main_page.source', 'source' ) )

    scoreTypes.forEach( el => result.push( new TableColumn(  el.key, '1fr' , el.tableHeader, el.sortedKey ) ))

    if ( sorted == Sorted.UP ) {
        result[sortedIdx].sorted = Sorted.UP
        result[sortedIdx].sortedKey += '_desc'
    }
    if ( sorted == Sorted.DOWN) {
        result[sortedIdx].sorted = Sorted.DOWN
    }

    return result
}

export const createProfileTableColumn = (

    sortedIdx:number,
    sorted:Sorted

):TableColumn[] => {
    let result : TableColumn[] = []

    if ( sortedIdx == 0 ) {
        if ( sorted == Sorted.DOWN )
            result.push( new TableColumn('record_text', '2fr' , 'profile_page.oldest', 'time' ))
        if ( sorted == Sorted.UP )
            result.push( new TableColumn('record_text', '2fr' , 'profile_page.newest', 'time' ))
    }
    else result.push( new TableColumn('record_text', '2fr' , '', 'time' ))


        result.push( new TableColumn('score', '0.5fr', 'main_page.score','score' ))

    if ( sorted == Sorted.UP ) {
        result[sortedIdx].sorted = Sorted.UP
        result[sortedIdx].sortedKey += '_desc'
    }
    if ( sorted == Sorted.DOWN) {
        result[sortedIdx].sorted = Sorted.DOWN
    }

    return result
}