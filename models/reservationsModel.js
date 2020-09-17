
class Reservation {
    constructor(reservationDate, reservationTime, party, userId) {
        this.reservationDate = reservationDate;
        this.reservationTime = reservationTime;
        this.party = party;
        this.userId = userId;
    }
}

module.exports = Reservation;