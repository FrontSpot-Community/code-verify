import passport from 'passport';

export const passportAuthMiddlware = (options) => (
    passport.authenticate(
        'github',
        {
            ...options,
            session: false
        })
);
