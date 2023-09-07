export class Credentials {
    username:''
    password:''
}

export class Authentication{
    userName:string = ''
    token   :string = ''

    singIn( data:Authentication ) {
        this.userName = data.userName
        this.token    = data.token

        this.saveLocaleStorage()
    }

    signOut(){
        this.clear()

        console.log("Authentication:singOut")
    }

    getUserName(): string{
        if(!this.userName.length){
            console.error( "Authentication:getUserName", 'Empty')
        }

        return this.userName;
    }

    isAuthenticated(): boolean {
        console.log("Authentication:isAuthenticated", this.token.length)

        return this.token.length ? true : false
    }

    clear() {
        this.init();
        this.removeLocaleStorage();
    }

    init() {
        this.userName = '';
        this.token    = '';
    }

    saveLocaleStorage() {
        localStorage.setItem('userName', (this.userName))
        localStorage.setItem('token', this.token)
    }

    removeLocaleStorage() {
        localStorage.removeItem('token')
    }
}