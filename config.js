const guestRoutes = require('./routes/GuestRoutes')
const userRoutes = require('./routes/UserRoutes')
const adminRoutes = require('./routes/AdminRoutes')

module.exports = {
    migrate: true,
    guestRoutes,
    userRoutes,
    adminRoutes,
    port: process.env.PORT || '1634'
}