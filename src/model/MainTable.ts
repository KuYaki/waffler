import { TDropdown } from "@/views/search_params/types";

export class ColumnMainTable {
    field :string  = '';
    width :string  = '';
    label :string  = '';
    sorted:boolean = false;

    constructor( field:string, width:string, label:string, sorted:boolean = false ) {
        this.field = field
        this.width = width
        this.label = label
        this.sorted = sorted
    }
}


export const createMainTableColumns = ( curProperty:TDropdown[], propertyList:TDropdown[], sortedIdx:number ):ColumnMainTable[]=>{
    let result : ColumnMainTable[] = []

    result.push( new ColumnMainTable('name', '2fr', 'main_page.name' ))
    result.push( new ColumnMainTable('source_type', '1fr', 'main_page.source' ) )

    if ( curProperty.length == 0 ) {

        propertyList.forEach( el => result.push( new ColumnMainTable(  el.key, '1fr' , el.tableHeader ) ))

    } else {

        curProperty.forEach( el => result.push( new ColumnMainTable(  el.key, '1fr' , el.tableHeader ) ))

    }

    result[sortedIdx].sorted = true

    return result
}