
class LocalStorageManager {
  static instance;

  LOGIN_DATA = 'loginData';
  
  static get shared() {
    if( this.instance ) {
      return this.instance;
    }

    this.instance = new LocalStorageManager();
    return this.instance;
  }

  getLoginData() {
    const str = localStorage.getItem( this.LOGIN_DATA );
    if( !str )  return null;

    const obj = JSON.parse( str );
    return obj;
  }
  setLoginData( objData ) {
    const strData = JSON.stringify( objData );
      
    localStorage.setItem( this.LOGIN_DATA, strData );
  }

  assignLoginData( objNew ) {
    let loginData = this.getLoginData();
    if( !loginData ) return;

    Object.assign( loginData, objNew );

    this.setLoginData( loginData );
  }

  changeToken( newToken ) {
    let loginData = this.getLoginData();
    if( !loginData ) return;

    loginData.token = newToken;

    this.setLoginData( loginData );
  }

  clear() {
    localStorage.removeItem( this.LOGIN_DATA );
    // localStorage.clear();
  }

  getIsAdmin() {
    const loginData = this.getLoginData();

    const { isAdmin } = loginData;

    return isAdmin;
  }
}

export default LocalStorageManager