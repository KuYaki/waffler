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

    result.push( new ColumnMainTable('name', '30%', 'main_page.name' ))
    result.push( new ColumnMainTable('source', '10%', 'main_page.source' ) )

    if ( curProperty.length == 0 ) {

        propertyList.forEach( el => result.push( new ColumnMainTable(  el.key, '15%' , el.tableHeader ) ))

    } else {

        curProperty.forEach( el => result.push( new ColumnMainTable(  el.key, '15%' , el.tableHeader ) ))

    }

    result[sortedIdx].sorted = true

    return result
}