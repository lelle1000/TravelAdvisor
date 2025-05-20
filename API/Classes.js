
class LogIn {
    static AllUsers = [];
    constructor(username, password, gmail) {

        this.id = LogIn.HighestId();
        this.username = username;
        this.password = password;
        this.gmail = gmail;
        LogIn.AllUsers.push(this)
    }

    static HighestId() {
    if (LogIn.AllUsers.length > 0) {
        let HighestNum = 0;
        for (let i = 0; i < LogIn.AllUsers.length; i++) {
            if (LogIn.AllUsers[i].id > HighestNum) {
                HighestNum = LogIn.AllUsers[i].id
            }
        }
        return HighestNum + 1
    } else {
        return 1;
    }
    }
}



