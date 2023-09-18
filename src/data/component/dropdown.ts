class DropdownData {

    property = [
        { id: 0, label: 'Waffler', tableHeader:'main_page.waffler', key:"waffler_score" , sortedKey:'waffler'},
        { id: 1, label: 'Racizm',  tableHeader:'main_page.racizm' , key:"racism_score"  , sortedKey:'racizm'},
    ]

    source = [
        { id:0,  label: 'Telegram', key:'', icon:'pi pi-telegram'},
        { id:1,  label: 'YouTube' , key:'', icon:'pi pi-youtube'},
    ]

}

export default new DropdownData