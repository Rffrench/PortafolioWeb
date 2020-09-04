// Modelo Usuario


class User {
    constructor(email, username, password, name, lastName) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
    }

}

module.exports = User;