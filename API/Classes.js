export class LogIn {
    static AllUsers = [];
    constructor(username, password, gmail) {

        this.id = LogIn.HighestId();
        this.username = username;
        this.password = password;
        this.gmail = gmail;
        this.wishlist = [];
        this.friendsList = [];
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

    addDestinationToList(destination) {
        if (!this.wishlist.includes(destination)) {
            this.wishlist.push(destination);
        }
    }

    set newUserName(value) {
        const forbiddenValues = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '?', '/', '\\', '+', '=', '<', '>', ',', '.', ':', ';'];
        if (forbiddenValues.some(forbidden => forbidden.includes(value))) {
            return true;
        } else {
            this.username = value;
        }
    }

    get newUserName() {
        return this.username;
    }

    set newPassword(value) {
        if (value.length < 8) {
            return true;
        } else {
            this.password = value;
        }
    }

    get newPassword() {
        return this.password;
    }

    set newGmail(value) {
        const hasToHave = ["@"];
        if (value.includes(hasToHave)) {
            this.newGmail = value;
        } else {
            return true;
        }
    }

    get newGmail() {
        return this.gmail;
    }

}

/////// Denna klass kan vi nog ta bort, men vi väntar lite
// export class WishList extends LogIn {

//     constructor(username, password, gmail) {
//         super(username, password, gmail);
//         this.wishlist = [];
//     }

//     addDestinationToList(destination) {
//         if (!this.wishlist.includes(destination)) {
//             this.wishlist.push(destination);
//         }
//     }

// }

// Denna klass kan kanske istället extenda från Login klassen
export class BookingDataLog {

    static logArray = [];

    constructor(username, gmail) {
        this.username = username;
        this.gmail = gmail;
        this.bookingNumber = BookingDataLog.logArray.length++
    }

}