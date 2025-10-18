const express = require('express');

const passport = require('passport');
const dotenv = require('dotenv');

const router = express.Router();

dotenv.config();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Not authenticated',
        });
    }
});

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'Authentication failed',
    });
});

router.get('/logout', function (req, res, next) {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.session.destroy((err) => {
            res.clearCookie('connect.sid');
            res.json({
                status: 'logout',
                user: {},
            });
        });
    });
});

router.get('/github', passport.authenticate('github', { scope: ['read:user'] }));

router.get(
    '/github/callback',
    passport.authenticate('github', {
        successRedirect: `${CLIENT_URL}/`,
        failureRedirect: `${CLIENT_URL}/`,
    })
);

module.exports = router;
