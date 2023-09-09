export class Credentials {
    username      : ''
    password      : ''
}

export class Authentication {
    userName    :string  = ''
    access_token :string = ''
    refresh_token:string = ''

    signIn( userName:string , data:Authentication ) {
        this.userName = userName
        this.access_token = data.access_token
        this.refresh_token = data.refresh_token

        this.saveLocaleStorage()
    }

    signOut(){
        this.clear()

        console.log("Authentication:signOut")
    }

    getUserName(): string{
        if(!this.userName.length){
            console.error( "Authentication:getUserName", 'Empty')
        }

        return this.userName;
    }

    isAuthenticated(): boolean {
        console.log("Authentication:isAuthenticated", this.access_token.length)

        return this.access_token.length ? true : false
    }

    clear() {
        this.init();
        this.removeLocaleStorage();
    }

    init() {
        this.userName = '';
        this.access_token    = '';
    }

    saveLocaleStorage() {
        localStorage.setItem('userName', (this.userName))
        localStorage.setItem('access_token', this.access_token)
        localStorage.setItem('refresh_token', this.refresh_token)
    }

    removeLocaleStorage() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    }
}