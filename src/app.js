const express = require('express')
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express()
const getNotesRoute = require('../src/routes/getNotes.routes')
const sendNotesRoute = require('../src/routes/sendNotes.routes')
const getNotesIdRoute = require('../src/routes/getNotesID.routes')
const getNotesFilterRoute = require('../src/routes/getNotesFilter.routes')
const userDataRoute = require('../src/routes/userData.routes')
const loginUserRoute = require('../src/routes/loginUser.routes')
const forgotPasswordRoute = require('../src/routes/forgotPassword.routes')
const otpVerifyRoute = require('../src/routes/otpVerify.routes')
const resetPasswordRoute = require('../src/routes/resetPassword.routes')
const deleteNotesRoute = require('../src/routes/deleteNotes.routes')
const summarizeNotesRoute = require('../src/routes/summarizeNotes.routes')
const editNotesRoute = require('../src/routes/editNotes.routes')
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: function(origin, callback) {
        callback(null, true);
    }
}));
app.use('/notes',getNotesRoute);
app.use('/notes',sendNotesRoute);
app.use('/notes',getNotesIdRoute);
app.use('/notes',getNotesFilterRoute);
app.use('/auth',userDataRoute);
app.use('/auth',loginUserRoute);
app.use('/auth',forgotPasswordRoute);
app.use('/auth',otpVerifyRoute);
app.use('/auth',resetPasswordRoute);
app.use('/notes',deleteNotesRoute);
app.use('/notes',summarizeNotesRoute);
app.use('/notes',editNotesRoute);
module.exports = app;